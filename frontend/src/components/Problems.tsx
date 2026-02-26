import React, { useState } from 'react'
import './Problems.scss'
import ProblemEditor from './ProblemEditor'

interface Problem {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  exampleQuery?: string
  expectedOutput?: string
}

const problemsData: Problem[] = [
  {
    id: 1,
    title: 'Select All Records',
    difficulty: 'Easy',
    category: 'Basic',
    description: 'Write a SQL query to select all records from a table.',
    exampleQuery: 'SELECT * FROM employees;',
    expectedOutput: 'All employee records'
  },
  {
    id: 2,
    title: 'Filter Data with WHERE',
    difficulty: 'Easy',
    category: 'Basic',
    description: 'Write a SQL query to filter employees with salary greater than 50000.',
    exampleQuery: 'SELECT * FROM employees WHERE salary > 50000;',
    expectedOutput: 'Employees with salary > 50000'
  },
  {
    id: 3,
    title: 'JOIN Two Tables',
    difficulty: 'Medium',
    category: 'Joins',
    description: 'Write a query to join employees and departments tables.',
    exampleQuery: 'SELECT e.name, d.name FROM employees e JOIN departments d ON e.dept_id = d.id;',
    expectedOutput: 'Employee and department pairs'
  },
  {
    id: 4,
    title: 'GROUP BY and Aggregation',
    difficulty: 'Medium',
    category: 'Aggregation',
    description: 'Calculate total sales by department using GROUP BY.',
    exampleQuery: 'SELECT department, SUM(sales) as total_sales FROM sales GROUP BY department;',
    expectedOutput: 'Sum of sales per department'
  },
  {
    id: 5,
    title: 'Complex Subqueries',
    difficulty: 'Hard',
    category: 'Advanced',
    description: 'Find employees earning more than average salary using subqueries.',
    exampleQuery: 'SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    expectedOutput: 'Employees above average salary'
  },
  {
    id: 6,
    title: 'Window Functions',
    difficulty: 'Hard',
    category: 'Advanced',
    description: 'Rank products by sales using ROW_NUMBER window function.',
    exampleQuery: 'SELECT name, sales, ROW_NUMBER() OVER (ORDER BY sales DESC) as rank FROM products;',
    expectedOutput: 'Products ranked by sales'
  }
]

const Problems: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']
  const categories = ['All', 'Basic', 'Joins', 'Aggregation', 'Advanced']

  const filtered = problemsData.filter(p => {
    const diffMatch = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty
    const catMatch = selectedCategory === 'All' || p.category === selectedCategory
    return diffMatch && catMatch
  })

  const getDifficultyClass = (difficulty: string) => {
    return `difficulty difficulty--${difficulty.toLowerCase()}`
  }

  // If a problem is selected, show the editor
  if (selectedProblem) {
    return (
      <ProblemEditor 
        problem={selectedProblem} 
        onBack={() => setSelectedProblem(null)}
      />
    )
  }

  // Otherwise, show the problems list
  return (
    <div className="problems">
      <div className="problems__header">
        <h1>SQL Problems</h1>
        <p>Master SQL with interactive coding challenges</p>
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

        <div className="filter-group">
          <label>Category</label>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="problems__list">
        <div className="problems__count">
          Showing {filtered.length} of {problemsData.length} problems
        </div>

        {filtered.length > 0 ? (
          <div className="problems__table">
            <div className="table-header">
              <div className="col col--status"></div>
              <div className="col col--title">Title</div>
              <div className="col col--difficulty">Difficulty</div>
              <div className="col col--category">Category</div>
              {/* <div className="col col--acceptance">Acceptance</div> */}
            </div>

            {filtered.map(problem => (
              <div 
                key={problem.id} 
                className="table-row"
                onClick={() => setSelectedProblem(problem)}
                role="button"
                tabIndex={0}
              >
                <div className="col col--status">
                  <input type="checkbox" title="Mark as solved" />
                </div>
                <div className="col col--title">
                  <div className="problem-title">
                    <span className="problem-id">#{problem.id}</span>
                    <div>
                      <h3>{problem.title}</h3>
                      <p className="problem-desc">{problem.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col col--difficulty">
                  <span className={getDifficultyClass(problem.difficulty)}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col col--category">
                  <span className="category-badge">{problem.category}</span>
                </div>
                <div className="col col--acceptance">
                  {/* <span className="acceptance">{problem.acceptance}%</span> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="problems__empty">
            <p>No problems found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Problems
