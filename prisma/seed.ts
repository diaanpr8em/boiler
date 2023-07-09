import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const mike = await prisma.users.upsert({
    where: { email: "mike.honeycomb@outlook.com" },
    update: {},
    create: {
      email: "mike.honeycomb@outlook.com",
      name: "Michael",
      surname: "Hanekom",
      UserRole: "ADMIN",
      UserSecurity: {
        create: {
          password:
            "$2b$10$H/6iWBwMBl/ZptBQPnTiKO9wSQrfI/qPMsSOqW.rlqfEtvxwaPb1G",
          refreshToken: "",
        }
      }
    }
  });
  const diaan = await prisma.users.upsert({
    where: { email: "diaan.r8em@outlook.com" },
    update: {},
    create: {
      email: "diaan.r8em@outlook.com",
      name: "Diaan",
      surname: "Prinsloo",
      UserRole: "ADMIN",
      UserSecurity: {
        create: {
          password:
            "$2b$10$H/6iWBwMBl/ZptBQPnTiKO9wSQrfI/qPMsSOqW.rlqfEtvxwaPb1G",
          refreshToken: "",
        }
      }
    }
  });
  console.log({ mike, diaan });
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
