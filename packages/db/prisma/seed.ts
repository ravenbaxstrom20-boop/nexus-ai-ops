import { prisma } from '../index';

async function main() {
  console.log('Seeding database...');

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'admin@nexusaiops.com' },
    update: {},
    create: {
      email: 'admin@nexusaiops.com',
      name: 'Nexus Admin',
      role: 'admin',
    },
  });

  console.log({ user });

  // Create sample leads
  const lead1 = await prisma.lead.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@techcorp.com',
      company: 'TechCorp',
      industry: 'Software',
      status: 'hot',
      value: 5000,
      score: 85,
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@marketingpro.io',
      company: 'MarketingPro',
      industry: 'Marketing',
      status: 'new',
      value: 2500,
      score: 45,
    },
  });

  const lead3 = await prisma.lead.create({
    data: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@builders.net',
      company: 'Bob Builders',
      industry: 'Construction',
      status: 'qualified',
      value: 12000,
      score: 92,
    },
  });

  console.log('Leads created');

  // Create sample jobs
  await prisma.job.create({
    data: {
      title: 'CRM Implementation',
      description: 'Setup and configure Nexus AI Ops for TechCorp',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      leadId: lead1.id,
    },
  });

  await prisma.job.create({
    data: {
      title: 'Lead Enrichment Workflow',
      description: 'Automate lead enrichment for new MarketingPro leads',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      leadId: lead2.id,
    },
  });

  await prisma.job.create({
    data: {
      title: 'Infrastructure Audit',
      description: 'Audit the construction pipeline infrastructure',
      status: 'completed',
      priority: 'low',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      leadId: lead3.id,
    },
  });

  await prisma.job.create({
    data: {
      title: 'General Maintenance',
      description: 'Monthly platform maintenance',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Jobs created');

  // Create sample workflows
  await prisma.workflow.create({
    data: {
      name: 'Lead Scoring Flow',
      description: 'Automatically score new leads based on company size and industry',
      definition: JSON.stringify({
        nodes: [
          { id: '1', type: 'trigger', data: { event: 'lead.created' } },
          { id: '2', type: 'action', data: { action: 'ai_score' } },
        ],
        edges: [{ id: 'e1-2', source: '1', target: '2' }],
      }),
      active: true,
    },
  });

  console.log('Workflows created');
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
