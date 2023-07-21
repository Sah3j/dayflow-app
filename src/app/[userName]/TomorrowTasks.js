'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import AddTasks from '../../components/AddTasks'
import TaskBarTomorrow from '../../components/TaskBarTomorrow'

function TomorrowTasks() {

    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [loading, setLoading] = useState(false)

  async function getTasks() {
    setLoading(true)
    try {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      setDisplayDate(format((tomorrow), 'eeee, MMM dd'));
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);

      const endpoint = `/api/getTasks/?date=${formattedDate}`

      const response = await fetch(endpoint)
        .then( response => response.json() )
        .then( response => {
            setTasks(response);
            setLoading(false)
        })

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
        <div className='flex flex-col items-center'>
            <h1 className='text-xl max-md:text-lg font-bold text-white'>Plan Your Goals for Tomorrow</h1>
            <h2 className='text-lg max-md:text-base font-semibold text-gray-400'>{displayDate}</h2>
        </div>
        <div className='flex justify-center py-4'>
          {tasks.length === 0 ? (
            <>
              <AddTasks getTasks={getTasks} tomDate={displayDate} date={date} loading={loading} setLoading={setLoading}/>
            </>
          ) : (
            <div className='flex flex-col'>
              <div className='px-2'>
                <TaskBarTomorrow tasks={tasks} date={date} tomDate={displayDate} getTasks={getTasks} loading={loading} setLoading={setLoading}/>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default TomorrowTasks