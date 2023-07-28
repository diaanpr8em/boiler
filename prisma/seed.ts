import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {

  await prisma.tenants.upsert({
    where: { id: 1},
    update: {},
    create: {
      name: "Local",
      domain: "localhost:3000",
      currency: "ZAR"
    }
  })

  await prisma.tenants.upsert({
    where: { id: 2},
    update: {},
    create: {
      name: "Staging",
      domain: "staging-localhost:3000",
      currency: "ZAR"
    }
  })

  //const mike = await prisma.users.upsert({
  await prisma.users.upsert({
    where: { email: "mike.honeycomb@outlook.com" },
    update: {},
    create: {
      email: "mike.honeycomb@outlook.com",
      name: "Michael",
      surname: "Hanekom",
      userRole: "ADMIN",
      UserSecurity: {
        create: {
          password:
            "$2b$10$H/6iWBwMBl/ZptBQPnTiKO9wSQrfI/qPMsSOqW.rlqfEtvxwaPb1G",
          refreshToken: "",
        }
      },
      UserPreferences: {
        create: { setting: "CHANNELS", value: "email:sms" },
      }
    }
  });
  //const diaan = await prisma.users.upsert({
  await prisma.users.upsert({
    where: { email: "diaan.r8em@outlook.com" },
    update: {},
    create: {
      email: "diaan.r8em@outlook.com",
      name: "Diaan",
      surname: "Prinsloo",
      userRole: "ADMIN",
      UserSecurity: {
        create: {
          password:
            "$2b$10$H/6iWBwMBl/ZptBQPnTiKO9wSQrfI/qPMsSOqW.rlqfEtvxwaPb1G",
          refreshToken: "",
        }
      },
      UserPreferences: {
        create: { setting: "CHANNELS", value: "email:sms" },
      }
    }
  });

  await prisma.userTenantLinks.createMany({
    data: [
      { userId: 1, tenantId: 1 },
      { userId: 2, tenantId: 1 },
      { userId: 3, tenantId: 1 }
    ]
  })

  await prisma.contacts.createMany({
    data: [
      { fullName: "Diaan Prinsloo", email: "diaan.r8em@outlook.com", mobile: "+27764790903", handle: "", tenantId: 1},
      { fullName: "Michael Hanekom", email: "mike.honeycomb@outlook.com", mobile: "+27724060846", handle: "", tenantId: 1},
      { fullName: "Lauren Prinsloo", email: "gumtreelauren@gmail.com", mobile: "0814070024", handle: "", tenantId: 1}
    ]
  })

  await prisma.systemSettings.createMany({
    data: [
      { tenantId: 1, module: "NOTIFICATIONS", setting: "NOTIFICATIONS_EMAIL_FROM", value: "no-reply@talentforge.co.za"},
      { tenantId: 1, module: "NOTIFICATIONS", setting: "NOTIFICATIONS_SMTP_HOST", value: "mail.talentforge.co.za"},
      { tenantId: 1, module: "NOTIFICATIONS", setting: "NOTIFICATIONS_SMTP_PASS", value: "something"},
      { tenantId: 1, module: "NOTIFICATIONS", setting: "NOTIFICATIONS_SMTP_PORT", value: "587"},
      { tenantId: 1, module: "NOTIFICATIONS", setting: "NOTIFICATIONS_SMTP_USER", value: "no-reply@talentforge.co.za"}
    ]
  })

  await prisma.modules.createMany({
    data: [
      { name: "Accounting", icon: "mdi-calculator", url: "/accounting", order: 1 },
      { name: "Billing", icon: "mdi-receipt-text", url: "/billing", order: 2 },
      { name: "Contacts", icon: "mdi-card-account-mail", url: "/contacts", order: 3 },
      { name: "Communication", icon: "mdi-account-voice", url: "/communication", order: 4 },
      { name: "Human Resources", icon: "mdi-badge-account", url: "/hr", order: 5 },
      { name: "Inventory", icon: "mdi-warehouse", url: "/inventory", order: 6 },
      { name: "Marketing", icon: "mdi-bullhorn", url: "/marketing", order: 7 },
      { name: "Listings", icon: "mdi-image-frame", url: "/listings", order: 8 },
      { name: "Support", icon: "mdi-face-agent", url: "/support", order: 9 },
      { name: "Tasks", icon: "mdi-calendar-check", url: "/tasks", order: 10 },
      { name: "Training", icon: "mdi-human-male-board-poll", url: "/training", order: 11 },
    ]
  })

  await prisma.moduleItems.createMany({
    data: [
      { moduleId: 1, name: "Chart of Accounts", description: "Manage your chart of accounts", icon: "mdi-chart-box-outline", url: "/accounting/chart-of-accounts", order: 1 },
    ]
  })

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
