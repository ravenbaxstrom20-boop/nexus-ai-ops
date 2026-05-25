import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '@nexus/db';
import leadRoutes from './routes/leads';
import workflowRoutes from './routes/workflows';
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT || '3001', 10);
app.use(cors());
app.use(express.json());
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/leads', leadRoutes);
app.use('/workflows', workflowRoutes);
// Users (temporary/legacy)
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`API server listening on http://0.0.0.0:${port}`);
});
