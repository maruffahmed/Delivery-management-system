import { PrismaClient } from '@prisma/client';
import ProductTypes from './data/ProductTypes';
import Locations from './data/AreaTree';
import AreaPrice from './data/AreaPrice';
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

  // Seed Zones
  const zones = AreaPrice.zones;
  const InsideDhaka = zones[0];
  const SuburbDhaka = zones[1];
  const OutSideDhaka = zones[2];

  const insideDhaka = await prisma.zones.upsert({
    where: { name: InsideDhaka.NAME },
    update: {},
    create: {
      name: InsideDhaka.NAME,
      pricing: {
        create: {
          KG05_PRICE: InsideDhaka.PRICING.SHOPUP_KG05_PRICE,
          KG1_PRICE: InsideDhaka.PRICING.SHOPUP_KG1_PRICE,
          KG2_PRICE: InsideDhaka.PRICING.SHOPUP_KG2_PRICE,
          KG3_PRICE: InsideDhaka.PRICING.SHOPUP_KG3_PRICE,
          KG4_PRICE: InsideDhaka.PRICING.SHOPUP_KG4_PRICE,
          KG5_PRICE: InsideDhaka.PRICING.SHOPUP_KG5_PRICE,
        },
      },
    },
  });

  const suburbDhaka = await prisma.zones.upsert({
    where: { name: SuburbDhaka.NAME },
    update: {},
    create: {
      name: SuburbDhaka.NAME,
      pricing: {
        create: {
          KG05_PRICE: SuburbDhaka.PRICING.SHOPUP_KG05_PRICE,
          KG1_PRICE: SuburbDhaka.PRICING.SHOPUP_KG1_PRICE,
          KG2_PRICE: SuburbDhaka.PRICING.SHOPUP_KG2_PRICE,
          KG3_PRICE: SuburbDhaka.PRICING.SHOPUP_KG3_PRICE,
          KG4_PRICE: SuburbDhaka.PRICING.SHOPUP_KG4_PRICE,
          KG5_PRICE: SuburbDhaka.PRICING.SHOPUP_KG5_PRICE,
        },
      },
    },
  });

  const outSideDhaka = await prisma.zones.upsert({
    where: { name: OutSideDhaka.NAME },
    update: {},
    create: {
      name: OutSideDhaka.NAME,
      pricing: {
        create: {
          KG05_PRICE: OutSideDhaka.PRICING.SHOPUP_KG05_PRICE,
          KG1_PRICE: OutSideDhaka.PRICING.SHOPUP_KG1_PRICE,
          KG2_PRICE: OutSideDhaka.PRICING.SHOPUP_KG2_PRICE,
          KG3_PRICE: OutSideDhaka.PRICING.SHOPUP_KG3_PRICE,
          KG4_PRICE: OutSideDhaka.PRICING.SHOPUP_KG4_PRICE,
          KG5_PRICE: OutSideDhaka.PRICING.SHOPUP_KG5_PRICE,
        },
      },
    },
  });

  // Seed locations
  const locations = Locations.Divisions;

  for (const division of locations) {
    const div = await prisma.divisions.upsert({
      where: { name: division.NAME },
      update: {},
      create: {
        name: division.NAME,
      },
    });
    // delay
    await delay(100);

    const district = division.Districts;
    for (const d of district) {
      const dis = await prisma.districts.upsert({
        where: { name: d.NAME },
        update: {},
        create: {
          name: d.NAME,
          division: {
            connect: {
              id: div.id,
            },
          },
        },
      });
      // delay
      await delay(100);

      const area = d.Areas;
      for (const a of area) {
        const zoneId =
          InsideDhaka.AREAS.findIndex((z) => z.NAME === a.NAME) > -1
            ? insideDhaka.id
            : SuburbDhaka.AREAS.findIndex((z) => z.NAME === a.NAME) > -1
            ? suburbDhaka.id
            : outSideDhaka.id;

        await prisma.areas.upsert({
          where: { name: a.NAME },
          update: {},
          create: {
            name: a.NAME,
            district: {
              connect: {
                id: dis.id,
              },
            },
            zones: {
              connect: {
                id: zoneId,
              },
            },
          },
        });
        // delay
        await delay(100);
      }
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
