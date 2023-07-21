'use client'

import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

function GoalsHistory() {

  const [tasks, setTasks] = useState([]);

  const getTaskHistory = async () => {
    try {
    const today = new Date()

    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 1)
    const sDate = startDate.toISOString().slice(0,10)

    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() - 10)
    const eDate = endDate.toISOString().slice(0,10)

    const endpoint = `/api/getTaskHistory?startDate=${sDate}&endDate=${eDate}`

      const response = await fetch(endpoint)
        .then( response => response.json() )
        .then( response => {
            const organizedTasks = organizeTasksByDate(response)
            setTasks(organizedTasks)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const organizeTasksByDate = (tasks) => {
    const tasksByDate = {};

    for (const task of tasks) {
      const date = task.date;
      if(tasksByDate[date]) {
        tasksByDate[date].push(task);
      } else {
        tasksByDate[date] = [task];
      }
    }

    return tasksByDate;
  }

  useEffect(() => {
    getTaskHistory();
  }, []);

  return (
    <div className='border-b-2 border-blue-600 w-full mx-6 overflow-auto'>
      <h1 className='text-xl text-white font-bold flex justify-center my-3'>Goals History</h1>
      {Object.entries(tasks).length === 0 && <h3 className='text-lg text-gray-400 py-4 text-center'>Your goals history will be displayed here</h3>}
      {Object.entries(tasks).map(([date, tasksForDate]) => (
      <div key={date} className='even:bg-gray-900 px-6 py-2'>
        <h2 className='text-gray-400 text-sm'>{format(parseISO(date), 'MMMM, d yyyy')}</h2>
        <div className='inline-flex bg-neutral-800 rounded-3xl'>
          {tasksForDate.map(task => (
            <div key={task.id}
            className={`p-2 px-4 cursor-pointer select-none
            first:rounded-l-3xl last:rounded-r-3xl border-r-2 border-r-neutral-900 last:border-r-0
            target:animate-pulse
            `}>
              <div className={`text-xl ${!task.completed && 'grayscale'}`}>
                  {task.emoji}
              </div>
            </div>  
          ))}
        </div>
      </div>
    ))}
    </div>
  )
}

export default GoalsHistory