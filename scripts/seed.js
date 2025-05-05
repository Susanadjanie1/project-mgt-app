import { PrismaClient } from "../lib/generated/prisma/client"

const prisma = new PrismaClient();

async function main() {
  // Create dummy user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      role: 'member',
    },
  });

  // Create dummy project
  const project = await prisma.project.create({
    data: {
      name: 'Demo Project',
      description: 'This is a seeded project for testing.',
      status: 'active',
    },
  });

  // Assign the user to the project
  await prisma.projectAssignment.create({
    data: {
      projectId: project.id,
      userId: user.id,
    },
  });

  console.log('✅ Seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
