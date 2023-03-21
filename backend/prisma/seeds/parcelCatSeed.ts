import { PrismaClient } from '@prisma/client';
import ParentParcelCat from '../data/ParentParcelCat';
// import { delay } from '../utils';
const prisma = new PrismaClient();

async function main() {
  // Seed parcel categories
  const parcelParentCategoies = ParentParcelCat.parentCategories;
  for (const parentCategory of parcelParentCategoies) {
    await prisma.parcelProductCategories.upsert({
      where: { name: parentCategory.name },
      update: {},
      create: {
        name: parentCategory.name,
      },
    });
    //delay
    // await delay(100);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
