import { PrismaClient } from '@prisma/client';
import { ParcelStatus } from './data/ParcelStatus';
import ProductTypes from './data/ProductTypes';
import { Roles } from './data/UsersRole';
const prisma = new PrismaClient();

async function main() {
  // Seed user roles
  for (const role of Roles) {
    await prisma.roleDescription.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  const adminRoleId = await prisma.roleDescription.findUnique({
    where: { name: 'admin' },
  });
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
            connect: {
              id: adminRoleId.id,
            },
          },
        },
      },
    },
  });

  const merchantRoleId = await prisma.roleDescription.findUnique({
    where: { name: 'merchant' },
  });
  const maruf = await prisma.user.upsert({
    where: { email: 'maruffamd@gmail.com' },
    update: {},
    create: {
      email: 'maruffamd@gmail.com',
      name: 'Maruf Ahmed',
      phone: '01789393745',
      password: '$2b$10$btodHpHti0d4gEB2zd1LdueFA1lJLISmdvNxOVuvQda5DfJDnHD1u',
      roles: {
        create: {
          role: {
            connect: {
              id: merchantRoleId.id,
            },
          },
        },
      },
      shops: {
        create: {
          name: 'Maruf Shop',
          email: 'maruffamd@gmail.com',
          address: 'House #22, Road #9, Sector #10, Uttara, Dhaka',
          productType: 'Clothing',
          productSubType: 'Men',
          pickUpPoints: {
            create: {
              name: 'Maruf Ahmed',
              address: 'House #22, Road #9, Sector #10, Uttara, Dhaka',
              areaId: 1143,
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
    // await delay(100);
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
      // await delay(100);
    }
  }

  // seed Parcel Status

  for (const status of ParcelStatus) {
    await prisma.parcelStatus.upsert({
      where: { name: status.name },
      update: {},
      create: {
        name: status.name,
        description: status.description,
      },
    });
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
