'use client'

import React, {useState} from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import EditTasks from './EditTasks'

function TaskBarTomorrow({tasks, tomDate, date, getTasks, loading, setLoading}) {

    const deleteTasks = async (date) => {
        console.log("diabeled")
        setLoading(true)
        try {
            const endpoint = `/api/deleteTasks/?date=${date}`
      
            const response = await fetch(endpoint, {
                method: 'DELETE'
            })
              .then( response => response.json() )
              .then( response => {
                  console.log(response)
              })
      
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <div className='flex'>
            {tasks.length === 0 ? (
                <p>No goals set for tomorrow</p>
            ) : (
                <>
                <div className={`flex bg-neutral-800 rounded-3xl ${loading && 'animate-pulse'}`}>
                {tasks.map((task) => (
                    <div key={task.id}
                        className={`py-4 px-8 max-md:py-2 max-md:px-4 cursor-pointer select-none
                        first:rounded-l-3xl last:rounded-r-3xl border-r-2 border-r-neutral-900 last:border-r-0
                        target:animate-pulse
                        `}>
                            <div className={`text-3xl max-md:text-xl grayscale`}>
                                {task.emoji}
                            </div>
                    </div>     
                ))}
                </div>
                <div className='flex flex-col justify-between'>
                    <EditTasks tomorrowTasks={tasks} tomDate={tomDate} date={date} getTasks={getTasks} loading={loading} setLoading={setLoading}/>
                    <button 
                    onClick={()=>deleteTasks(date).then(() => getTasks())}
                    className='ml-4 border-2 rounded-full border-blue-600 text-blue-400 p-1
                    hover:bg-blue-600'
                    disabled={loading}>
                        <AiFillDelete/>
                    </button>
                </div>
                </>
            )}
        </div>
        
      )
}

export default TaskBarTomorrow