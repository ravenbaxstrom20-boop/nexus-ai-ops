import { Router } from 'express';
import { prisma } from '@nexus/db';
const router = Router();
// GET /jobs - List all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            include: { lead: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(jobs);
    }
    catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});
// GET /jobs/:id - Get a single job
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const job = await prisma.job.findUnique({
            where: { id },
            include: { lead: true },
        });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    }
    catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});
// POST /jobs - Create a new job
router.post('/', async (req, res) => {
    const { title, description, status, priority, dueDate, leadId } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    try {
        const newJob = await prisma.job.create({
            data: {
                title,
                description,
                status: status || 'pending',
                priority: priority || 'medium',
                dueDate: dueDate ? new Date(dueDate) : null,
                leadId,
            },
            include: { lead: true },
        });
        res.status(201).json(newJob);
    }
    catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});
// PATCH /jobs/:id - Update a job
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, leadId } = req.body;
    try {
        const updatedJob = await prisma.job.update({
            where: { id },
            data: {
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                leadId,
            },
            include: { lead: true },
        });
        res.json(updatedJob);
    }
    catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
});
// DELETE /jobs/:id - Delete a job
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.job.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete job' });
    }
});
export default router;
