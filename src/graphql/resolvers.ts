import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import type { Resolvers } from '@graphql-tools/utils'

interface Context {
  session: Awaited<ReturnType<typeof getServerSession>>
}

export const resolvers: Resolvers<Context> = {
  Query: {
    appointments: async () => {
      return prisma.appointment.findMany({
        include: { user: true }
      })
    },
    
    appointment: async (_: any, { id }: { id: string }) => {
      return prisma.appointment.findUnique({
        where: { id },
        include: { user: true }
      })
    },
    
    userAppointments: async (_: any, __: any, context: any) => {
      const session = await getServerSession()
      if (!session?.user) throw new Error('Not authenticated')
      
      return prisma.appointment.findMany({
        where: { userId: session.user.id },
        include: { user: true }
      })
    }
  },
  
  Mutation: {
    createAppointment: async (_: any, args: any, context: any) => {
      const session = await getServerSession()
      if (!session?.user) throw new Error('Not authenticated')
      
      return prisma.appointment.create({
        data: {
          ...args,
          userId: session.user.id
        },
        include: { user: true }
      })
    },
    
    updateAppointment: async (_: any, { id, ...args }: any) => {
      return prisma.appointment.update({
        where: { id },
        data: args,
        include: { user: true }
      })
    },
    
    deleteAppointment: async (_: any, { id }: { id: string }) => {
      await prisma.appointment.delete({
        where: { id }
      })
      return true
    }
  }
} 