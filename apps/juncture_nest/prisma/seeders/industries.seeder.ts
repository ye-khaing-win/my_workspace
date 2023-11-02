import { PrismaClient } from '@prisma/client';
import { industries } from '../../assets/seeds';

const prisma = new PrismaClient();

async function main() {
  await prisma.industry.deleteMany();

  await prisma.industry.createMany({ data: industries });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
