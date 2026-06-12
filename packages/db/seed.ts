import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Upsert Admin User
  await prisma.user.upsert({
    where: { email: 'admin@nexusaiops.com' },
    update: {},
    create: {
      email: 'admin@nexusaiops.com',
      name: 'Nexus Admin',
      role: 'admin',
    },
  });

  console.log('User created or updated');

  // Clear existing data to avoid duplicates (and because Lead.email is not unique for upsert)
  await prisma.job.deleteMany();
  await prisma.lead.deleteMany();
  console.log('Cleared existing leads and jobs');

  // Create Leads
  const leadsData = [
    {
      firstName: 'Alice',
      lastName: 'Chen',
      email: 'alice@techcorp.com',
      company: 'TechCorp',
      industry: 'Software',
      status: 'qualified',
      score: 85,
      source: 'website',
      value: 5000,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@marketingpro.io',
      company: 'MarketingPro',
      industry: 'Marketing',
      status: 'new',
      score: 45,
      source: 'referral',
      value: 2500,
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@builders.net',
      company: 'Bob Builders',
      industry: 'Construction',
      status: 'qualified',
      score: 92,
      source: 'cold outreach',
      value: 12000,
    },
    {
      firstName: 'Michael',
      lastName: 'Scott',
      email: 'm.scott@dundermifflin.com',
      company: 'Dunder Mifflin',
      industry: 'Paper',
      status: 'lost',
      score: 10,
      source: 'website',
      value: 500,
    },
    {
      firstName: 'Sarah',
      lastName: 'Miller',
      email: 'sarah@greenenergy.com',
      company: 'GreenEnergy',
      industry: 'Energy',
      status: 'qualified',
      score: 78,
      source: 'referral',
      value: 8000,
    },
    {
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david@wilsonlogistics.com',
      company: 'Wilson Logistics',
      industry: 'Logistics',
      status: 'new',
      score: 55,
      source: 'cold outreach',
      value: 4000,
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily@davislegal.com',
      company: 'Davis Legal',
      industry: 'Legal',
      status: 'new',
      score: 60,
      source: 'website',
      value: 3000,
    },
    {
      firstName: 'Chris',
      lastName: 'Brown',
      email: 'chris@brownbakery.com',
      company: 'Brown Bakery',
      industry: 'Food',
      status: 'qualified',
      score: 70,
      source: 'referral',
      value: 1500,
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

  // Create Jobs
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
