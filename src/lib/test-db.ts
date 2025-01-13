import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // Try to create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'test123',
        name: 'Test User',
        role: 'USER'
      }
    })
    
    console.log('Successfully connected to database!')
    console.log('Created test user:', user)
    
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 