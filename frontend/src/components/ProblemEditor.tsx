import React, { useState } from 'react'
import './ProblemEditor.scss'

interface EditorProblem {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  exampleQuery?: string
  expectedOutput?: string
}

interface ProblemEditorProps {
  problem: EditorProblem
  onBack: () => void
}

interface QueryResult {
  [key: string]: string | number
}

const ProblemEditor: React.FC<ProblemEditorProps> = ({ problem, onBack }) => {
  const [code, setCode] = useState(problem.exampleQuery || 'SELECT * FROM table_name;')
  const [output, setOutput] = useState<QueryResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState('')

  const handleRun = () => {
    setIsRunning(true)
    setError('')
    
    // Simulate query execution
    setTimeout(() => {
      try {
        if (!code.trim()) {
          setError('Query cannot be empty')
          setIsRunning(false)
          return
        }

        // Mock execution - in real app, send to backend
        const mockResults = [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 95000 },
          { id: 2, name: 'Jane Smith', department: 'Design', salary: 85000 },
          { id: 3, name: 'Bob Wilson', department: 'Engineering', salary: 105000 }
        ]

        setOutput(mockResults)
        setError('')
      } catch (err) {
        setError('Syntax error in query')
      }
      setIsRunning(false)
    }, 800)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="editor">
      <div className="editor__header">
        <button className="editor__back-btn" onClick={onBack}>
          ← Back to Problems
        </button>
        <div className="editor__title-section">
          <span className={`difficulty difficulty--${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <h1>{problem.title}</h1>
        </div>
      </div>

      <div className="editor__container">
        {/* Left Panel - Problem Description */}
        <div className="editor__panel editor__panel--description">
          <div className="description">
            <h2>Description</h2>
            <p className="description__text">
              {problem.description}
            </p>

            <div className="description__info">
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">{problem.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ID:</span>
                <span className="info-value">#{problem.id}</span>
              </div>
            </div>

            {problem.expectedOutput && (
              <div className="expected">
                <h3>Expected Output</h3>
                <div className="expected__content">
                  <p>Returns the matching records with columns: id, name, department, salary</p>
                </div>
              </div>
            )}

            <div className="hints">
              <h3>💡 Hints</h3>
              <ul>
                <li>Think about which columns you need to retrieve</li>
                <li>Consider applying filters if needed</li>
                <li>Check your syntax for typos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="editor__panel editor__panel--code">
          <div className="editor-wrapper">
            <div className="editor-header">
              <h3>SQL Editor</h3>
              <div className="editor-actions">
                <button
                  className="btn btn--secondary btn--sm"
                  onClick={() => handleCopy(code)}
                  title="Copy code"
                >
                  Copy
                </button>
                <button
                  className="btn btn--secondary btn--sm"
                  onClick={() => setCode('')}
                  title="Clear code"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your SQL query here..."
              spellCheck="false"
            />

            <button
              className="btn btn--primary btn--run"
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : '▶ Run Query'}
            </button>
          </div>

          {/* Output Section */}
          <div className="output">
            <h3>Output</h3>

            {error && (
              <div className="output__error">
                <span className="error-icon">✕</span>
                <p>{error}</p>
              </div>
            )}

            {!error && output.length > 0 && (
              <div className="output__results">
                <div className="results-info">
                  ✓ Query executed successfully - {output.length} row(s) returned
                </div>

                <div className="table-scroll">
                  <table className="results-table">
                    <thead>
                      <tr>
                        {Object.keys(output[0]).map(key => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {output.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((val: any, i) => (
                            <td key={i}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!error && output.length === 0 && (
              <div className="output__empty">
                <p>Run your query to see results here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemEditor
