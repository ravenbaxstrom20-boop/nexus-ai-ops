import { Router } from 'express';
import { prisma } from '@nexus/db';
const router = Router();
// GET /dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const jobStats = await prisma.job.groupBy({
            by: ['status'],
            _count: {
                _all: true
            }
        });
        const hotLeadsCount = await prisma.lead.count({
            where: {
                score: {
                    gt: 80
                }
            }
        });
        const totalLeadsValue = await prisma.lead.aggregate({
            _sum: {
                value: true
            }
        });
        res.json({
            jobsByStatus: jobStats.map(stat => ({
                status: stat.status,
                count: stat._count._all
            })),
            hotLeadsCount,
            totalLeadsValue: totalLeadsValue._sum.value || 0
        });
    }
    catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});
export default router;
