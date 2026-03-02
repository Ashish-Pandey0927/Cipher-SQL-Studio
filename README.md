# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where users can practice SQL queries against pre-configured assignments with real-time execution and intelligent LLM-powered hints.

The system focuses on secure execution, clear architecture, and guided learning — not automated solution generation.

---

##  Tech Stack

### Frontend
- React.js
- Monaco Editor
- Vanilla SCSS (Mobile-first, BEM methodology)

### Backend
- Node.js
- Express.js
- Middleware-based validation

### Databases
- PostgreSQL (Neon Cloud) – SQL execution engine
- MongoDB Atlas – Assignment metadata storage

### LLM Integration
- Google Gemini API (Hint generation only)

---

#  Architecture Overview

CipherSQLStudio follows a layered full-stack architecture with strict separation of responsibilities.

## Frontend (React)

Responsible for:
- Rendering assignment list
- Displaying schema and sample data
- Providing SQL editor (Monaco)
- Sending queries to backend
- Rendering results dynamically
- Requesting contextual hints

All UI updates are state-driven using React hooks.

---

## Backend (Express)

Acts as the orchestration layer between frontend and services.

Core responsibilities:
- Route handling
- Query validation middleware
- Secure SQL execution
- LLM prompt construction
- Response formatting

### Main Endpoints

- `GET /api/assignments`
- `POST /api/execute`
- `POST /api/hint`

---

## PostgreSQL (Neon Cloud)

Used strictly for SQL query execution.

- Tables are pre-configured by administrators
- Only SELECT queries are allowed
- Destructive queries are blocked via validation middleware

This ensures safe execution while preserving database integrity.

---

## MongoDB (Atlas)

Stores assignment metadata:

- Title
- Description
- Difficulty
- Table schemas
- Sample preview rows

MongoDB does not execute SQL queries.  
It acts purely as structured content storage.

---

## LLM Hint System (Google Gemini)

Hints are generated using controlled prompt engineering.

Safeguards implemented:
- Explicit instruction to avoid full solutions
- No code block responses
- Regex-based SQL keyword filtering
- Short conceptual guidance only

The goal is to assist learning without revealing answers.

---

#  Data Flow Diagram (DFD)

![Data Flow Diagram](./docs/dfd.jpg)

### Query Execution Flow

User → React → `POST /api/execute`  
→ Validation Middleware → PostgreSQL  
→ JSON Response → React State Update → Results Render

### Hint Flow

User → React → `POST /api/hint`  
→ Express → Gemini API  
→ Filtered Response → React State Update → Hint Display

---

# 📸 Screenshots

## Assignment Listing Page
![Assignments](./docs/screenshot-assignments.png)

## Assignment Attempt Interface
![Editor](./docs/screenshot-editor.png)

## Hint System
![Hint](./docs/screenshot-hint.png)

---

# 🔐 Security Considerations

- Only SELECT queries are permitted
- Destructive SQL commands are blocked
- Environment variables used for all secrets
- LLM restricted to hint-level responses
- Separation between execution DB and metadata DB

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder:

- MONGO_URI=
- DATABASE_URL=
- GEMINI_API_KEY=
- PORT=5000


---

# ▶️ Installation & Setup

## 1️⃣ Clone Repository
 git clone<your-repo-url>
 cd CipherSQLStudio

