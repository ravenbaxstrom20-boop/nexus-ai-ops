import { Router } from 'express';
import { WorkflowExecutionService } from '../services/workflow-execution';

const router = Router();

/**
 * POST /workflows/:id/execute
 * Execute a workflow with the provided payload.
 */
router.post('/:id/execute', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const result = await WorkflowExecutionService.executeWorkflow(id, payload);
    if (!result) {
      return res.status(404).json({ error: 'Workflow not found or inactive' });
    }
    res.json(result);
  } catch (error) {
    console.error(`API Error executing workflow ${id}:`, error);
    res.status(500).json({ error: 'Failed to execute workflow' });
  }
});

export default router;
