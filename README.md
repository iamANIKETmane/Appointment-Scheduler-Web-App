# Appointment Scheduler Web App

A full-stack appointment scheduling application built with modern web technologies. This application allows users to create, manage, and track appointments with a clean and intuitive interface.

## Features

- 📅 Interactive calendar view
- ✨ Real-time appointment management
- 🔐 User authentication and authorization
- 👤 User-specific appointment views
- 📱 Responsive design
- 🎨 Clean and modern UI with TailwindCSS

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - TailwindCSS
  - Apollo Client

- **Backend:**
  - GraphQL API
  - Prisma ORM
  - MongoDB
  - NextAuth.js

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/iamANIKETmane/Appointment-Scheduler-Web-App.git
   cd Appointment-Scheduler-Web-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     DATABASE_URL="mongodb://127.0.0.1:27017/appointment_scheduler_db"
     NEXTAUTH_SECRET="your-random-secret-key"
     NEXTAUTH_URL="http://localhost:3000"
     ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
