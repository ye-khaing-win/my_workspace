import { PrismaClient } from '@prisma/client';
import { permissions } from '../../assets/seeds';

const prisma = new PrismaClient();

async function main() {
  await prisma.permission.deleteMany();

  await prisma.permission.createMany({ data: permissions });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
