import React, { useEffect, useState } from 'react'
import './Problems.scss'
import ProblemEditor from './ProblemEditor'

interface TableMeta {
  name: string
  schemaDefinition: string
  samplePreview: any[]
}

interface Assignment {
  _id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tables: TableMeta[]
}

const Problems = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/assignments')
        const data = await res.json()
        setAssignments(data)
      } catch (err) {
        console.error('Failed to fetch assignments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  const filtered = assignments.filter(a =>
    selectedDifficulty === 'All' || a.difficulty === selectedDifficulty
  )

  const getDifficultyClass = (difficulty: string) =>
    `difficulty difficulty--${difficulty.toLowerCase()}`

  if (selectedAssignment) {
    return (
      <ProblemEditor
        assignment={selectedAssignment}
        onBack={() => setSelectedAssignment(null)}
      />
    )
  }

  if (loading) {
    return <div className="problems">Loading assignments...</div>
  }

  return (
    <div className="problems">
      <div className="problems__header">
        <h1>SQL Assignments</h1>
        <p>Practice SQL with real-time execution</p>
      </div>

      <div className="problems__filters">
        <div className="filter-group">
          <label>Difficulty</label>
          <div className="filter-buttons">
            {difficulties.map(diff => (
              <button
                key={diff}
                className={`filter-btn ${selectedDifficulty === diff ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="problems__list">
        <div className="problems__count">
          Showing {filtered.length} of {assignments.length} assignments
        </div>

        {filtered.length > 0 ? (
          <div className="problems__table">
            <div className="table-header">
              <div className="col col--title">Title</div>
              <div className="col col--difficulty">Difficulty</div>
            </div>

            {filtered.map(assignment => (
              <div
                key={assignment._id}
                className="table-row"
                onClick={() => setSelectedAssignment(assignment)}
                role="button"
                tabIndex={0}
              >
                <div className="col col--title">
                  <h3>{assignment.title}</h3>
                  <p className="problem-desc">{assignment.description}</p>
                </div>

                <div className="col col--difficulty">
                  <span className={getDifficultyClass(assignment.difficulty)}>
                    {assignment.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="problems__empty">
            <p>No assignments found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Problems