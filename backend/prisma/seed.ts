import { hashPassword } from "../src/lib/bcrypt";
import db from "../src/lib/prisma";
import { seedUser } from "./util";

const main = async () => {
  console.log("Seeding database...");
  await seedUser();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
