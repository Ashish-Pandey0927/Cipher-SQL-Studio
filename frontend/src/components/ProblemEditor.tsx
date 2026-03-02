import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./ProblemEditor.scss";

interface TableMeta {
  name: string;
  schemaDefinition: string;
  samplePreview: any[];
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tables: TableMeta[];
}

interface Props {
  assignment: Assignment;
  onBack: () => void;
}

const ProblemEditor = ({ assignment, onBack }: Props) => {
  const [code, setCode] = useState("SELECT * FROM employees;");
  const [output, setOutput] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hint, setHint] = useState<string>("");
  const [loadingHint, setLoadingHint] = useState(false);

  const handleRun = async () => {
    if (!code.trim()) {
      setError("Query cannot be empty");
      return;
    }

    try {
      setIsRunning(true);
      setError("");
      setOutput([]);

      const res = await fetch("http://localhost:5000/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: code }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setOutput(data.rows);
    } catch (err: any) {
      setError(err.message || "Execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  const handleHint = async () => {
    try {
      setLoadingHint(true);
      setHint("");

      const res = await fetch("http://localhost:5000/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: assignment.title,
          description: assignment.description,
          tables: assignment.tables,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setHint(data.hint);
    } catch (err) {
      setHint("Unable to generate hint.");
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <div className="editor">
      <div className="editor__header">
        <button onClick={onBack}>← Back</button>
        <h1>{assignment.title}</h1>
        <span
          className={`difficulty difficulty--${assignment.difficulty.toLowerCase()}`}
        >
          {assignment.difficulty}
        </span>
      </div>

      <div className="editor__container">
        {/* LEFT PANEL */}
        <div className="editor__panel editor__panel--description">
          <h2>Description</h2>
          <p>{assignment.description}</p>

          <h3>Sample Data</h3>

          {assignment.tables.map((table, index) => (
            <div key={index} className="sample-table">
              <h4>{table.name}</h4>
              <p>
                <strong>Schema:</strong> {table.schemaDefinition}
              </p>

              {table.samplePreview.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      {Object.keys(table.samplePreview[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.samplePreview.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val: any, j) => (
                          <td key={j}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}

          {hint && (
            <div className="hint-box">
              <div className="hint-box__title">💡 Hint</div>
              <div className="hint-box__content">{hint}</div>
            </div>
          )}

          <button
            onClick={handleHint}
            disabled={loadingHint}
            style={{ marginTop: 90, width: 80, height: 40 }}
          >
            {loadingHint ? "Thinking..." : "Get Hint"}
          </button>

          
        </div>

        {/* RIGHT PANEL */}
        <div className="editor__panel editor__panel--code">
          <Editor
            height="300px"
            defaultLanguage="sql"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
          />

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="btn btn--primary"
          >
            {isRunning ? "Running..." : "Run Query"}
          </button>

          <div className="output">
            <h3>Results</h3>

            {error && <div className="error">{error}</div>}

            {!error && output.length > 0 && (
              <table>
                <thead>
                  <tr>
                    {Object.keys(output[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {output.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val: any, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!error && output.length === 0 && !isRunning && (
              <p>No results yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
