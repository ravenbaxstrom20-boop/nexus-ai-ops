# Nexus AI Ops API Reference

The backend API is built with Node.js and Express. It serves as the bridge between the React frontend, the Prisma database layer, and the AI workflow engine.

## 📡 Endpoints

### Health Check
- **GET** `/health`: Returns the system status.

### Leads
- **GET** `/leads`: List all leads.
- **GET** `/leads/:id`: Get lead details.
- **POST** `/leads`: Create a new lead.
- **PATCH** `/leads/:id`: Update a lead.
- **DELETE** `/leads/:id`: Remove a lead.

### Jobs
- **GET** `/jobs`: List all active jobs.
- **GET** `/jobs/:id`: Get job details.
- **POST** `/jobs`: Create a new job.
- **PATCH** `/jobs/:id`: Update a job status or details.
- **DELETE** `/jobs/:id`: Remove a job.

### Workflows
- **GET** `/workflows`: List all available workflows.
- **POST** `/workflows/:id/execute`: Manually trigger a workflow.
- **GET** `/workflows/executions`: (Planned) List workflow execution history.

### Dashboard & Analytics
- **GET** `/dashboard/stats`: Get summary metrics for the dashboard (e.g., total leads, active jobs, pipeline value).
- **GET** `/search`: Global search across leads and jobs.

## 🔐 Authentication
*(Authentication implementation is ongoing. Currently, the API is open for development.)*

## 🤖 AI Features
Workflows can include the following AI actions:
- `ai_enrichment`: Automatically researches company details and LinkedIn profiles.
- `ai_lead_scoring`: Scores leads based on fit and potential value.
- `ai_process`: Executes custom LLM prompts using available context.
