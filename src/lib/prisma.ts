import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClient = new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaClient
}

export const prisma = global.prisma || prismaClient 