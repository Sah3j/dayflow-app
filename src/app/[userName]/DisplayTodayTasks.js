'use client'

import React, { useState, useEffect } from 'react'
import TasksBar from '../../components/TasksBar'
import AddTasks from '../../components/AddTasks'
import { format } from 'date-fns'

function DisplayTodayTasks() {
    const [tasks, setTasks] = useState([]);

    //for updatingTaskStatus
    const [updating, setUpdating] = useState(null);
    const [showTaskCompleted, setShowTaskCompleted] = useState(false);
    const [date, setDate] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [loading, setLoading] = useState(false)

  async function getTasks() {
    setLoading(true)
    try {
      const currentDate = new Date();
      setDisplayDate(format((currentDate), 'eeee, MMM dd'));
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);

      const endpoint = `/api/getTasks/?date=${formattedDate}`

      const response = await fetch(endpoint)
        .then( response => response.json() )
        .then( response => {
            setTasks(response);
            setLoading(false);
        })

    } catch (error) {
      console.error('Error:', error);
    }
  }

  function animateTaskCompleted () {
    setShowTaskCompleted(true);

    setTimeout(() => {
        setShowTaskCompleted(false)
    }, 3000)
  }

  async function updateTaskStatus(taskId, isCompleted){

    setUpdating(taskId);

    const data = {
        id: taskId,
        completed: isCompleted ? false : true,
    }

    
    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/updateTaskStatus'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        },
        body:  JSONdata,
    }

    const response = await fetch(endpoint, options)

    getTasks();

    setUpdating(null)
    if (!isCompleted) {
        animateTaskCompleted();
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='text-black flex flex-col'>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl max-md:text-2xl font-bold text-white'>Your Goals for Today</h1>
            <h2 className='text-xl max-md:text-lg font-semibold text-gray-400'>{displayDate}</h2>
        </div>
        <div className='flex justify-center py-4'>
            {tasks.length === 0 ? (
                <>
                <AddTasks getTasks={getTasks} tomDate={displayDate} date={date} loading={loading} setLoading={setLoading}/>
              </>
            ) : (
              <div className='px-2'>
                <TasksBar tasks={tasks} getTasks={getTasks} updateTaskStatus={updateTaskStatus} updating={updating} showTaskCompleted={showTaskCompleted} date={date} tomDate={displayDate} loading={loading} setLoading={setLoading}/>
              </div>
            )}
        </div>
    </div>
  )
}

export default DisplayTodayTasks