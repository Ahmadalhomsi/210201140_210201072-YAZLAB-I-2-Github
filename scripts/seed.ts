const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Kilo Verme" },
        { name: "Accounting" },
        { name: "Fitness" },
        { name: "Filming" },
        { name: "Photography" },
        { name: "Engineering" },
        { name: "Computer Science" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();

/// This is to get the catogeries