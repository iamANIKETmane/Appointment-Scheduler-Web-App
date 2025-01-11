export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    role: String!
    appointments: [Appointment!]!
  }

  type Appointment {
    id: ID!
    title: String!
    description: String
    startTime: String!
    endTime: String!
    user: User!
    status: String!
  }

  type Query {
    appointments: [Appointment!]!
    appointment(id: ID!): Appointment
    userAppointments: [Appointment!]!
  }

  type Mutation {
    createAppointment(
      title: String!
      description: String
      startTime: String!
      endTime: String!
    ): Appointment!
    
    updateAppointment(
      id: ID!
      title: String
      description: String
      startTime: String
      endTime: String
      status: String
    ): Appointment!
    
    deleteAppointment(id: ID!): Boolean!
  }
`; 