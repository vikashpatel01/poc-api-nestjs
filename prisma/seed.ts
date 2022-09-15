import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const order1 = await prisma.order.upsert({
        where:{orderId: 1},
        update:{},
        create:{
            "customerName": "vikas",
            "customerId": "SOB20000512",
            "orderNumber": "2038787468",
            "enquiryId": "INQ20000945",
        },
    });
    const order2 = await prisma.order.upsert({
        where:{orderId: 2},
        update:{},
        create:  {
            "customerName": "Suchita",
            "customerId": "SOB20000513",
            "orderNumber": "2038787469",
            "enquiryId": "INQ20000946",
          },
    });
    const order3 = await prisma.order.upsert({
        where:{orderId: 3},
        update:{},
        create:  {
            "customerName": "Subham",
            "customerId": "SOB20000514",
            "orderNumber": "2038787470",
            "enquiryId": "INQ20000947",
          },
    });
    const order4 = await prisma.order.upsert({
        where:{orderId: 4},
        update:{},
        create:  {
            "customerName": "Lakshy",
            "customerId": "SOB20000515",
            "orderNumber": "2038787471",
            "enquiryId": "INQ20000948",
          },
    });

    console.log({ order4 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });