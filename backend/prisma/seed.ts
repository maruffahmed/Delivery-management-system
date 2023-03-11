import { PrismaClient } from '@prisma/client';
import ProductTypes from './data/ProductTypes';
const prisma = new PrismaClient();

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {
  // Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      phone: '01789393745',
      password: '$2b$10$btodHpHti0d4gEB2zd1LdueFA1lJLISmdvNxOVuvQda5DfJDnHD1u',
      roles: {
        create: {
          role: {
            create: {
              name: 'admin',
              description: 'Admin have all acess to this system',
            },
          },
        },
      },
    },
  });

  const maruf = await prisma.user.upsert({
    where: { email: 'maruf@gmail.com' },
    update: {},
    create: {
      email: 'maruf@gmail.com',
      name: 'Maruf Ahmed',
      phone: '01789393745',
      password: '$2b$10$btodHpHti0d4gEB2zd1LdueFA1lJLISmdvNxOVuvQda5DfJDnHD1u',
      roles: {
        create: {
          role: {
            create: {
              name: 'merchant',
            },
          },
        },
      },
      shops: {
        create: {
          name: 'Maruf Shop',
          email: 'marufShop@gmail.com',
          address: 'House #22, Road #9, Sector #10, Uttara, Dhaka',
          productType: 'Clothing',
          productSubType: 'Men',
          pickUpPoints: {
            create: {
              name: 'Maruf Ahmed',
              address: 'House #22, Road #9, Sector #10, Uttara, Dhaka',
              area: 'Sector 10, Uttara, Dhaka',
              phone: '01789393745',
              isActive: true,
            },
          },
        },
      },
    },
  });

  // Seed product categories
  const productParentCat = ProductTypes.parentCategories;
  const productChildCat = ProductTypes.childCategories;
  for (const parentCat of productParentCat) {
    const childCat = productChildCat.filter(
      (childCat) => childCat.PARENT_ID === parentCat.ID,
    );

    const pc = await prisma.shopProductsParentCategories.upsert({
      where: { name: parentCat.NAME },
      update: {},
      create: {
        name: parentCat.NAME,
        description: parentCat.DESCRIPTION,
      },
    });
    await delay(100);
    // console.log('Parent Category ', parentCat.NAME);

    for (const child of childCat) {
      await prisma.shopProductsChildCategories.upsert({
        where: { name: child.NAME },
        update: {},
        create: {
          name: child.NAME,
          description: child.DESCRIPTION,
          parent: {
            connect: {
              id: pc.id,
            },
          },
        },
      });
      // delay
      await delay(100);
    }
  }

  console.log('Users ', { admin, maruf });
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
