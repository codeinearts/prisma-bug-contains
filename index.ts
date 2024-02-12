import { PrismaClient } from "@prisma/client";

async function prismaSketch() {
  const prisma = new PrismaClient();

  const deleted = await prisma.user.deleteMany();
  console.log(deleted);

  const created = await prisma.user.createMany({
    data: [
      { firstName: "CARLOS", lastName: "SUAZO [DOCTOR]" },
      { firstName: "ATILA", lastName: "GENESIS [NURSE]" },
      { firstName: "BOB", lastName: "DYLAN [NURSE]" },
      { firstName: "MARK", lastName: "RENTON [DOCTOR]" },
    ],
  });
  console.log(created);

  const correctResults = await prisma.user.findMany({
    where: {
      lastName: { contains: "NURSE" },
    },
  });

  console.log(correctResults);
  /*
[
  {
    id: '65c98f233edab806443a6061',
    firstName: 'ATILA',
    lastName: 'GENESIS [NURSE]'
  },
  {
    id: '65c98f233edab806443a6062',
    firstName: 'BOB',
    lastName: 'DYLAN [NURSE]'
  }
]
  */

  const randomResults = await prisma.user.findMany({
    where: {
      lastName: { contains: "[NURSE]" },
    },
  });

  console.log(randomResults);
  /* 
[
  {
    id: '65c98f233edab806443a6060',
    firstName: 'CARLOS',
    lastName: 'SUAZO [DOCTOR]'
  },
  {
    id: '65c98f233edab806443a6061',
    firstName: 'ATILA',
    lastName: 'GENESIS [NURSE]'
  },
  {
    id: '65c98f233edab806443a6062',
    firstName: 'BOB',
    lastName: 'DYLAN [NURSE]'
  },
  {
    id: '65c98f233edab806443a6063',
    firstName: 'MARK',
    lastName: 'RENTON [DOCTOR]'
  }
]
  NANI!?
  */

  await prisma.$disconnect();
}

prismaSketch();
