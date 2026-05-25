import { Router } from 'express';
import { prisma } from '@nexus/db';

const router = Router();

// GET /search?q=...
router.get('/', async (req, res) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.json({ leads: [], jobs: [] });
  }

  try {
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { firstName: { contains: q } },
          { lastName: { contains: q } },
          { email: { contains: q } },
          { company: { contains: q } },
          { industry: { contains: q } },
          { companySize: { contains: q } },
        ],
      },
      take: 10,
    });

    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      take: 10,
    });

    res.json({
      leads,
      jobs,
    });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
});

export default router;
