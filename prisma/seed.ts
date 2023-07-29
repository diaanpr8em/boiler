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
      // Accounting
      { moduleId: 1, name: "Chart of Accounts", description: "Manage your chart of accounts", icon: "mdi-chart-box-outline", url: "/accounting/chart-of-accounts", order: 1 },
      // Billing
      { moduleId: 2, name: "Quotes", description: "List of quotes", icon: "mdi-chart-box-outline", url: "/billing/quotes", order: 1 },
      // Contacts
      { moduleId: 3, name: "Contacts", description: "List of contacts", icon: "mdi-chart-box-outline", url: "/contacts/search", order: 1 },
      // Communication
      { moduleId: 4, name: "Email", description: "Send emails", icon: "mdi-chart-box-outline", url: "/communication/email", order: 1 },
      { moduleId: 4, name: "SMS", description: "Send SMS", icon: "mdi-chart-box-outline", url: "/communication/sms", order: 2 },
      { moduleId: 4, name: "WhatsApp", description: "Send WhatsApp messages", icon: "mdi-chart-box-outline", url: "/communication/whatsapp", order: 3 },
      { moduleId: 4, name: "Meetings", description: "Schedule meetings", icon: "mdi-chart-box-outline", url: "/communication/meetings", order: 4 },
      { moduleId: 4, name: "Polls", description: "Create polls", icon: "mdi-chart-box-outline", url: "/communication/polls", order: 5 },
      // Human Resources
      { moduleId: 5, name: "Employees", description: "Manage employees", icon: "mdi-chart-box-outline", url: "/hr/employees", order: 1 },
      { moduleId: 5, name: "Payroll", description: "Manage payroll", icon: "mdi-chart-box-outline", url: "/hr/payroll", order: 2 },
      { moduleId: 5, name: "Leave", description: "Manage leave", icon: "mdi-chart-box-outline", url: "/hr/leave", order: 3 },
      { moduleId: 5, name: "Training", description: "Manage training", icon: "mdi-chart-box-outline", url: "/hr/training", order: 4 },
      { moduleId: 5, name: "Performance", description: "Manage performance", icon: "mdi-chart-box-outline", url: "/hr/performance", order: 5 },
      { moduleId: 5, name: "Recruitment", description: "Manage recruitment", icon: "mdi-chart-box-outline", url: "/hr/recruitment", order: 6 },
      // Inventory
      { moduleId: 6, name: "Products", description: "Manage products", icon: "mdi-chart-box-outline", url: "/inventory/products", order: 1 },
      { moduleId: 6, name: "Stock", description: "Manage stock", icon: "mdi-chart-box-outline", url: "/inventory/stock", order: 2 },
      { moduleId: 6, name: "Orders", description: "Manage orders", icon: "mdi-chart-box-outline", url: "/inventory/orders", order: 3 },
      { moduleId: 6, name: "Suppliers", description: "Manage suppliers", icon: "mdi-chart-box-outline", url: "/inventory/suppliers", order: 4 },
      // Marketing
      { moduleId: 7, name: "Campaigns", description: "Manage campaigns", icon: "mdi-chart-box-outline", url: "/marketing/campaigns", order: 1 },
      { moduleId: 7, name: "Leads", description: "Manage leads", icon: "mdi-chart-box-outline", url: "/marketing/leads", order: 2 },
      { moduleId: 7, name: "Opportunities", description: "Manage opportunities", icon: "mdi-chart-box-outline", url: "/marketing/opportunities", order: 3 },
      { moduleId: 7, name: "Customers", description: "Manage customers", icon: "mdi-chart-box-outline", url: "/marketing/customers", order: 4 },
      // Listings
      { moduleId: 8, name: "Listings", description: "Manage listings", icon: "mdi-chart-box-outline", url: "/listings/listings", order: 1 },
      { moduleId: 8, name: "Portals", description: "Manage portals", icon: "mdi-chart-box-outline", url: "/listings/portals", order: 2 },
      { moduleId: 8, name: "Agents", description: "Manage agents", icon: "mdi-chart-box-outline", url: "/listings/agents", order: 3 },
      // Support
      { moduleId: 9, name: "Tickets", description: "Manage tickets", icon: "mdi-chart-box-outline", url: "/support/tickets", order: 1 },
      { moduleId: 9, name: "Knowledge Base", description: "Manage knowledge base", icon: "mdi-chart-box-outline", url: "/support/knowledge-base", order: 2 },
      // Tasks
      { moduleId: 10, name: "Tasks", description: "Manage tasks", icon: "mdi-chart-box-outline", url: "/tasks/tasks", order: 1 },
      { moduleId: 10, name: "Projects", description: "Manage projects", icon: "mdi-chart-box-outline", url: "/tasks/projects", order: 2 },
      { moduleId: 10, name: "Time Tracking", description: "Manage time tracking", icon: "mdi-chart-box-outline", url: "/tasks/time-tracking", order: 3 },
      
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
