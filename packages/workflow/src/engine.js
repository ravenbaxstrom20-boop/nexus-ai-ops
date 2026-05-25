import { emailHandler } from './actions/email';
import { aiProcessHandler } from './actions/ai-process';
import { aiLeadScoringHandler } from './actions/ai-lead-scoring';
export class Engine {
    actionHandlers = new Map();
    constructor() {
        this.registerDefaultHandlers();
    }
    registerDefaultHandlers() {
        // Basic log action for testing
        this.registerActionHandler('log', async (config, data) => {
            console.log('Log Action:', config.message, 'Data:', data);
            return { status: 'logged' };
        });
        this.registerActionHandler('email', emailHandler);
        this.registerActionHandler('ai_process', aiProcessHandler);
        this.registerActionHandler('ai_lead_scoring', aiLeadScoringHandler);
    }
    registerActionHandler(type, handler) {
        this.actionHandlers.set(type, handler);
    }
    async executeWorkflow(definition, triggerPayload) {
        let context = {
            trigger: triggerPayload,
            steps: {},
            variables: {},
        };
        console.log(`Executing workflow with ${definition.actions.length} actions`);
        for (const action of definition.actions) {
            const handler = this.actionHandlers.get(action.type);
            if (!handler) {
                console.error(`No handler for action type: ${action.type}`);
                continue;
            }
            try {
                const result = await handler(action.config, context);
                context.steps[action.id] = result;
            }
            catch (error) {
                console.error(`Action ${action.id} failed:`, error);
                throw error;
            }
        }
        return context;
    }
}
