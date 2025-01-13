import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import type { IResolvers } from '@graphql-tools/utils'
import { User, Appointment, Prisma } from '@prisma/client'

// Define types for our GraphQL context and resolvers
interface Context {
  session: Awaited<ReturnType<typeof getServerSession>>
}

interface AppointmentInput {
  title: string
  description?: string
  startTime: string
  endTime: string
}

interface UpdateAppointmentInput {
  id: string
  title?: string
  description?: string
  startTime?: string
  endTime?: string
  status?: string
}

// Define the resolver types
export const resolvers: IResolvers<Context> = {
  Query: {
    appointments: async (_parent: unknown, _args: unknown, _context: Context) => {
      return prisma.appointment.findMany({
        include: { user: true }
      })
    },
    
    appointment: async (_parent: unknown, { id }: { id: string }) => {
      return prisma.appointment.findUnique({
        where: { id },
        include: { user: true }
      })
    },
    
    userAppointments: async (_parent: unknown, _args: unknown, context: Context) => {
      const session = await getServerSession()
      if (!session?.user?.email) throw new Error('Not authenticated')
      
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      if (!user) throw new Error('User not found')
      
      return prisma.appointment.findMany({
        where: { userId: user.id },
        include: { user: true }
      })
    }
  },
  
  Mutation: {
    createAppointment: async (_parent: unknown, args: AppointmentInput, _context: Context) => {
      const session = await getServerSession()
      if (!session?.user?.email) throw new Error('Not authenticated')
      
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      if (!user) throw new Error('User not found')
      
      return prisma.appointment.create({
        data: {
          ...args,
          userId: user.id
        },
        include: { user: true }
      })
    },
    
    updateAppointment: async (_parent: unknown, { id, ...args }: UpdateAppointmentInput) => {
      // Type the validData object using Prisma's types
      const validData: Prisma.AppointmentUpdateInput = {
        ...(args.title && { title: args.title }),
        ...(args.description && { description: args.description }),
        ...(args.startTime && { startTime: new Date(args.startTime) }),
        ...(args.endTime && { endTime: new Date(args.endTime) }),
        ...(args.status && { status: args.status }),
      }

      return prisma.appointment.update({
        where: { id },
        data: validData,
        include: { user: true }
      })
    },
    
    deleteAppointment: async (_parent: unknown, { id }: { id: string }) => {
      await prisma.appointment.delete({
        where: { id }
      })
      return true
    }
  }
} 