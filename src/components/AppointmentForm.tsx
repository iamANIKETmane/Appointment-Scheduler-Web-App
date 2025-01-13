'use client'
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $title: String!
    $description: String
    $startTime: String!
    $endTime: String!
  ) {
    createAppointment(
      title: $title
      description: $description
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      title
      startTime
      endTime
    }
  }
`

export function AppointmentForm() {
  const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const startDateTime = new Date(`${formData.date}T${formData.startTime}:00`)
      const endDateTime = new Date(`${formData.date}T${formData.endTime}:00`)
      
      await createAppointment({
        variables: {
          title: formData.title,
          description: formData.description,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        },
      })
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
      })
      
    } catch (err) {
      console.error('Error creating appointment:', err)
    }
  }

  if (loading) return <div>Submitting...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  )
} 