'use client'
import React from 'react'
import { Calendar } from '@/components/Calendar'
import { AppointmentForm } from '@/components/AppointmentForm'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Appointment Scheduler</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar />
          <AppointmentForm />
        </div>
      </div>
    </main>
  )
} 