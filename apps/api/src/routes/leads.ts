import { Router } from 'express';
import { prisma } from '@nexus/db';
import { WorkflowExecutionService } from '../services/workflow-execution';

const router = Router();

// GET /leads - List all leads
router.get('/', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// GET /leads/:id - Get a single lead
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
    });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// POST /leads - Create a new lead
router.post('/', async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    company, 
    status, 
    source, 
    value, 
    score,
    enrich // Optional enrichment flag
  } = req.body;
  
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'firstName and lastName are required' });
  }

  try {
    const newLead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        status: status || 'new',
        source,
        value: value !== undefined ? parseFloat(value) : 0,
        score: score !== undefined ? parseInt(score) : 0,
      },
    });

    // Trigger workflows for the new lead (Scoring, Notifications, etc.)
    // We pass the enrichment flag in the metadata/payload if needed
    WorkflowExecutionService.triggerLeadWorkflows({ ...newLead, enrich }).catch(err => {
      console.error('Failed to trigger workflows for lead:', err);
    });

    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// PATCH /leads/:id - Update a lead
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Handle numeric fields if they are passed as strings
    if (data.value !== undefined) data.value = parseFloat(data.value);
    if (data.score !== undefined) data.score = parseInt(data.score);

    const updatedLead = await prisma.lead.update({
      where: { id },
      data,
    });
    res.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE /leads/:id - Delete a lead
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lead.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

export default router;
