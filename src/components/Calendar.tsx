'use client'
import React, { useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  
  const daysInMonth = selectedDate.daysInMonth()
  const firstDayOfMonth = selectedDate.startOf('month').day()
  
  const renderCalendarDays = () => {
    const days: JSX.Element[] = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />)
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50">
          <span className="font-semibold">{i}</span>
        </div>
      )
    }
    
    return days
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {selectedDate.format('MMMM YYYY')}
        </h2>
        <button
          onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  )
} 