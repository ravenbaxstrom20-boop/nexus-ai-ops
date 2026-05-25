import { Engine } from '../src/engine';
import { WorkflowDefinition } from '../src/types';

async function runLeadScoringTest() {
  const engine = new Engine();

  const definition: WorkflowDefinition = {
    trigger: {
      type: 'webhook',
      config: { path: '/lead-scoring' }
    },
    actions: [
      {
        id: 'score-lead',
        type: 'ai_lead_scoring',
        config: {}
      },
      {
        id: 'log-result',
        type: 'log',
        config: { message: 'Workflow finished' }
      }
    ]
  };

  const leads = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@competitor.edu',
      title: 'Student'
    },
    {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob@bigcorp.gov',
      company: 'Gov Agency',
      title: 'IT Director'
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@startup.com',
      company: 'Growth Co'
    }
  ];

  for (const lead of leads) {
    console.log(`\n--- Testing Lead: ${lead.firstName} ${lead.lastName} ---`);
    const result = await engine.executeWorkflow(definition, { lead });
    console.log('Result:', JSON.stringify(result.steps['score-lead'], null, 2));
  }
}

runLeadScoringTest().catch(console.error);
