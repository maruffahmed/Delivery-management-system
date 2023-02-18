import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
          name: 'Maruf Fasion',
          email: 'marufFasion@gmail.com',
          address: 'House #22, Road #9, Sector #10, Uttara, Dhaka',
          productType: 'Cloths',
          productSubType: 't-shirt',
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
