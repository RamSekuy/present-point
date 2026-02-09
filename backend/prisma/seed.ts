import { hashPassword } from "../src/lib/bcrypt";
import db from "../src/lib/prisma";

const main = async () => {
  console.log("Seeding database...");
  const pw = await hashPassword("12345678");
  console.log(pw);
  await db.user.create({
    data: {
      email: "wowo@gmail.com",
      password: pw,
      name: "Wowo Admin",
      isAdmin: true,
    },
  });
  console.log("user masuk");
};
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
