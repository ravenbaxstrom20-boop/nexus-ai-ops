# Workflow Engine Design

## Overview
The Workflow Engine is responsible for executing automated business processes. A workflow consists of a single trigger and a sequence of actions.

## Core Components

### 1. Engine
The `Engine` class is the central execution unit. It:
- Maintains a registry of action handlers.
- Takes a `WorkflowDefinition` and a `triggerPayload`.
- Executes actions in sequence, passing the context from one step to the next.

### 2. Triggers
Triggers are events that start a workflow execution. Examples:
- `webhook`: Triggered by an external HTTP request.
- `lead_created`: Triggered when a new lead is added to the system.
- `schedule`: Triggered at specific time intervals.

### 3. Actions
Actions are individual tasks performed within a workflow. Examples:
- `email`: Send an email notification.
- `slack`: Post a message to a Slack channel.
- `ai_process`: Use an LLM to process data (e.g., summarize a lead's description).
- `ai_lead_scoring`: AI-powered scoring of leads based on available data.
- `update_lead`: Update a lead's status in the database.

## Workflow Definition
Workflows are defined using a JSON structure:

```json
{
  "trigger": {
    "type": "lead_created",
    "config": {}
  },
  "actions": [
    {
      "id": "step1",
      "type": "ai_process",
      "config": {
        "prompt": "Summarize this lead: {{trigger.firstName}} {{trigger.lastName}}"
      }
    },
    {
      "id": "step2",
      "type": "slack",
      "config": {
        "channel": "sales-leads",
        "message": "New lead summarized: {{steps.step1.summary}}"
      }
    }
  ]
}
```

## AI Integration

AI actions (like `ai_process` and `ai_lead_scoring`) are currently implemented using mock logic or basic heuristics. To extend these to use actual LLMs:
- **Provider Abstraction**: Implement a common AI provider interface (e.g., OpenAI, Anthropic, or a local model).
- **Prompt Templates**: Use the execution context to hydrate prompt templates with real-time data.
- **Structured Output**: Use tools like Zod with LLM function calling to ensure AI responses match the expected JSON schema for workflow steps.

## Execution Context
During execution, a context object is maintained:
- `trigger`: The data that triggered the workflow.
- `steps`: Results of each completed action, keyed by action ID.
- `variables`: (Future) User-defined variables for the workflow.

## Future Considerations
- **Conditionals/Branching**: Add support for `if/else` logic.
- **Error Handling**: Define retry policies and error-handling steps.
- **Parallel Execution**: Allow some actions to run concurrently.
- **Vector DB Integration**: Native actions for searching and storing in vector databases.
