import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('admin123', 12)
  
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@themazematch.com' },
    update: {},
    create: {
      email: 'admin@themazematch.com',
      password: password,
      role: 'super_admin',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  // Create support user
  const supportPassword = await hash('support123', 12)
  const supportUser = await prisma.user.upsert({
    where: { email: 'support@themazematch.com' },
    update: {},
    create: {
      email: 'support@themazematch.com',
      password: supportPassword,
      role: 'admin',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  // Create manager user
  const managerPassword = await hash('manager123', 12)
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@themazematch.com' },
    update: {},
    create: {
      email: 'manager@themazematch.com',
      password: managerPassword,
      role: 'manager',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  // Create studio owner user
  const studioPassword = await hash('studio123', 12)
  const studioUser = await prisma.user.upsert({
    where: { email: 'studio@themazematch.com' },
    update: {},
    create: {
      email: 'studio@themazematch.com',
      password: studioPassword,
      role: 'studio_owner',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  // Create profiles for each user
  await prisma.profile.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      name: 'Admin User',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  await prisma.profile.upsert({
    where: { userId: supportUser.id },
    update: {},
    create: {
      userId: supportUser.id,
      name: 'Support User',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  await prisma.profile.upsert({
    where: { userId: managerUser.id },
    update: {},
    create: {
      userId: managerUser.id,
      name: 'Event Manager',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  await prisma.profile.upsert({
    where: { userId: studioUser.id },
    update: {},
    create: {
      userId: studioUser.id,
      name: 'Studio Owner',
      isVerified: true,
      verifiedAt: new Date(),
    },
  })

  // Create sample events
  await prisma.event.createMany({
    data: [
      {
        title: 'Valentine Social Night',
        description: 'A romantic evening for singles to connect',
        type: 'dating',
        date: '2026-02-14',
        time: '19:00',
        location: 'The Hub, Victoria Island',
        state: 'Lagos',
        capacity: 100,
        createdBy: managerUser.id,
      },
      {
        title: 'Charity Run for Education',
        description: 'Run to support underprivileged children',
        type: 'charity',
        date: '2026-03-15',
        time: '06:00',
        location: 'Tafawa Balewa Square',
        state: 'Lagos',
        capacity: 500,
        createdBy: managerUser.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })