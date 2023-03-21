import { PrismaClient } from '@prisma/client';
// import { delay } from '../utils';
import Locations from '../data/AreaTree';
import AreaPrice from '../data/AreaPrice';
const prisma = new PrismaClient();

async function main() {
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
    // await delay(100);

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
      // await delay(100);

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
        // await delay(100);
      }
    }
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
