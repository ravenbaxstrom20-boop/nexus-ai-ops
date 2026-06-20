# Nexus AI Ops API Reference

The Nexus AI Ops API is a RESTful interface built with Express and Node.js.

## 📡 Endpoints

### System
- **GET** `/health`: Returns 200 OK if the server is healthy.

### Leads
- **GET** `/leads`: List all leads.
- **GET** `/leads/:id`: Get a single lead with its job history.
- **POST** `/leads`: Create a new lead.
    - Body: `firstName`, `lastName`, `email`, `company`, `status`, `value`, `enrich` (optional boolean).
- **PATCH** `/leads/:id`: Update lead details or status.
- **DELETE** `/leads/:id`: Permanently delete a lead.

### Jobs
- **GET** `/jobs`: List all active jobs across all leads.
- **GET** `/jobs/:id`: Get job details.
- **POST** `/jobs`: Create a new job.
    - Body: `title`, `description`, `status`, `priority`, `dueDate`, `leadId`.
- **PATCH** `/jobs/:id`: Update job status, priority, or details.
- **DELETE** `/jobs/:id`: Delete a job.

### Workflows
- **GET** `/workflows`: List available workflow definitions.
- **POST** `/workflows/:id/execute`: Manually trigger a workflow.
    - Body: `payload` (context data for the workflow).

### Dashboard
- **GET** `/dashboard/stats`: Get summary metrics:
    - Total Lead Value
    - Active Jobs Count
    - New Leads (Last 30 Days)
    - Conversion Rate
- **GET** `/search`: Search leads and jobs by name, company, or title.

## 🤖 AI Action Types
When defining workflows, you can use these built-in AI actions:
- `ai_enrichment`: Researches the lead's company and LinkedIn.
- `ai_lead_scoring`: Assigns a priority score (1-100) based on fit.
- `ai_process`: Generic LLM prompt execution.

## ⚙️ Environment Variables
- `PORT`: Server port (default 3001).
- `DATABASE_URL`: Connection string for PostgreSQL or SQLite.
- `GEMINI_API_KEY`: API key for Google Generative AI.
