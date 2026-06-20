import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nexusaiops.com' },
    update: {},
    create: {
      email: 'admin@nexusaiops.com',
      name: 'Nexus Admin',
      role: 'admin',
    },
  });
  console.log('Admin user created/verified');

  // Create sample leads
  const leadsData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@techcorp.com',
      company: 'TechCorp',
      industry: 'Software',
      status: 'new',
      value: 5000,
      score: 75,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@marketingpro.io',
      company: 'MarketingPro',
      industry: 'Marketing',
      status: 'contacted',
      value: 2500,
      score: 45,
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@builders.net',
      company: 'Bob Builders',
      industry: 'Construction',
      status: 'qualified',
      value: 12000,
      score: 92,
    },
    {
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice@paperco.com',
      company: 'Dunder Mifflin',
      industry: 'Paper',
      status: 'new',
      value: 1500,
      score: 30,
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@energyx.com',
      company: 'EnergyX',
      industry: 'Energy',
      status: 'new',
      value: 8000,
      score: 65,
    },
    {
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david@logistics.com',
      company: 'Wilson Logistics',
      industry: 'Logistics',
      status: 'qualified',
      value: 15000,
      score: 88,
    },
    {
      firstName: 'Eve',
      lastName: 'Davis',
      email: 'eve@legal.com',
      company: 'Davis Legal',
      industry: 'Legal',
      status: 'new',
      value: 3000,
      score: 55,
    },
    {
      firstName: 'Frank',
      lastName: 'Miller',
      email: 'frank@foodie.com',
      company: 'Foodie Inc',
      industry: 'Food & Beverage',
      status: 'contacted',
      value: 4500,
      score: 70,
    },
  ];

  const leads = [];
  for (const data of leadsData) {
    const lead = await prisma.lead.create({
      data,
    });
    leads.push(lead);
  }
  console.log(`${leads.length} leads created`);

  // Create sample jobs
  const techCorp = leads.find(l => l.company === 'TechCorp');
  const marketingPro = leads.find(l => l.company === 'MarketingPro');
  const builders = leads.find(l => l.company === 'Bob Builders');
  const logistics = leads.find(l => l.company === 'Wilson Logistics');
  const legal = leads.find(l => l.company === 'Davis Legal');

  const jobsData = [
    {
      title: 'CRM Implementation',
      description: 'Setup and configure Nexus AI Ops for TechCorp',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      leadId: techCorp?.id,
    },
    {
      title: 'Lead Enrichment Workflow',
      description: 'Automate lead enrichment for new MarketingPro leads',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      leadId: marketingPro?.id,
    },
    {
      title: 'Infrastructure Audit',
      description: 'Audit the construction pipeline infrastructure',
      status: 'completed',
      priority: 'low',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      leadId: builders?.id,
    },
    {
      title: 'Logistic Automation',
      description: 'Automate delivery tracking for Wilson Logistics',
      status: 'pending',
      priority: 'urgent',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      leadId: logistics?.id,
    },
    {
      title: 'Legal Document Parsing',
      description: 'Implement AI parsing for Davis Legal contracts',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      leadId: legal?.id,
    },
    {
      title: 'Website SEO Strategy',
      description: 'Develop comprehensive SEO plan for MarketingPro',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      leadId: marketingPro?.id,
    },
    {
      title: 'Platform Maintenance',
      description: 'Monthly platform maintenance and security updates',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const data of jobsData) {
    await prisma.job.create({
      data,
    });
  }
  console.log(`${jobsData.length} jobs created`);

  // Create sample workflows
  await prisma.workflow.upsert({
    where: { id: 'sample-workflow-1' },
    update: {},
    create: {
      id: 'sample-workflow-1',
      name: 'Lead Scoring Flow',
      description: 'Automatically score new leads based on fit and potential value',
      definition: JSON.stringify({
        trigger: { type: 'lead_created' },
        actions: [
          { id: 'enrich-1', type: 'ai_enrichment', config: {} },
          { id: 'score-1', type: 'ai_lead_scoring', config: { leadStepId: 'enrich-1' } },
        ],
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
