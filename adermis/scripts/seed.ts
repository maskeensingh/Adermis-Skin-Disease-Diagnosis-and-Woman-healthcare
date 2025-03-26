// scripts/seed.ts
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

async function seedDatabase() {
  const prisma = new PrismaClient()

  try {
    // Create a dummy user
    const hashedPassword = await bcrypt.hash('testpassword123', 12)
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        profile: {
          create: {
            firstName: 'Test',
            lastName: 'User',
            age: 30,
            gender: 'MALE',
            phoneNumber: '+1234567890',
            location: 'Test City'
          }
        }
      }
    })

    console.log('Dummy user created:', user)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed script
seedDatabase()