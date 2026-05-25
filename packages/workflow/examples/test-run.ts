import { Engine } from '../src/engine';
import { WorkflowDefinition } from '../src/types';

async function runTest() {
  const engine = new Engine();

  const definition: WorkflowDefinition = {
    trigger: {
      type: 'webhook',
      config: { path: '/incoming-lead' }
    },
    actions: [
      {
        id: 'step1',
        type: 'log',
        config: { message: 'Workflow started' }
      },
      {
        id: 'step2',
        type: 'ai_process',
        config: { prompt: 'Summarize lead: {{trigger.firstName}} {{trigger.lastName}}' }
      },
      {
        id: 'step3',
        type: 'email',
        config: { to: 'sales@example.com', subject: 'New Lead Processed' }
      }
    ]
  };

  const payload = {
    lead: {
      firstName: 'John',
      lastName: 'Doe'
    }
  };

  const result = await engine.executeWorkflow(definition, payload);
  console.log('Result:', JSON.stringify(result, null, 2));
}

runTest().catch(console.error);
