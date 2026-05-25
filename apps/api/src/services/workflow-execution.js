import { prisma } from '@nexus/db';
import { Engine } from '@nexus/workflow';
const engine = new Engine();
export class WorkflowExecutionService {
    /**
     * Execute a specific workflow by ID with a given payload.
     */
    static async executeWorkflow(workflowId, payload) {
        const workflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
        });
        if (!workflow || !workflow.active) {
            console.warn(`Workflow ${workflowId} not found or inactive.`);
            return null;
        }
        try {
            const definition = typeof workflow.definition === 'string'
                ? JSON.parse(workflow.definition)
                : workflow.definition;
            const result = await engine.executeWorkflow(definition, payload);
            // Post-execution side effects (e.g., updating lead score)
            const scoringStep = Object.values(result.steps).find((step) => step && step.score !== undefined);
            if (scoringStep && payload.lead?.id) {
                await prisma.lead.update({
                    where: { id: payload.lead.id },
                    data: { score: scoringStep.score },
                });
                console.log(`[WorkflowExecutionService] Updated lead ${payload.lead.id} score to ${scoringStep.score}`);
            }
            return result;
        }
        catch (error) {
            console.error(`[WorkflowExecutionService] Error executing workflow ${workflowId}:`, error);
            throw error;
        }
    }
    /**
     * Trigger any active workflows that should run on lead creation.
     */
    static async triggerLeadWorkflows(lead) {
        const workflows = await prisma.workflow.findMany({
            where: { active: true },
        });
        for (const workflow of workflows) {
            try {
                const definition = typeof workflow.definition === 'string'
                    ? JSON.parse(workflow.definition)
                    : workflow.definition;
                // Check if the workflow trigger matches lead creation
                const isLeadTrigger = definition.trigger?.type === 'lead_created' ||
                    (definition.trigger?.type === 'webhook' && definition.trigger?.config?.path?.includes('lead'));
                if (isLeadTrigger) {
                    console.log(`[WorkflowExecutionService] Triggering workflow "${workflow.name}" for lead ${lead.id}`);
                    // Execute asynchronously
                    this.executeWorkflow(workflow.id, { lead }).catch(err => {
                        console.error(`[WorkflowExecutionService] Async execution failed for lead ${lead.id}:`, err);
                    });
                }
            }
            catch (e) {
                console.error(`[WorkflowExecutionService] Failed to process workflow ${workflow.id}:`, e);
            }
        }
    }
}
