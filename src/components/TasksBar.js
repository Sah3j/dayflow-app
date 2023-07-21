'use client'

import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import EditTasks from './EditTasks'

function TasksBar({tasks, updateTaskStatus, updating, showTaskCompleted, tomDate, date, getTasks, loading, setLoading}) {

    const deleteTasks = async (date) => {
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
    <div className='flex flex-col'>
        <p className={`self-center bg-blue-600 text-blue-200 rounded-full px-4 py-1 mb-1 select-none text-xs
        ${showTaskCompleted  ? 'opacity-100' : 'opacity-0'}
        transition`}>
            Task Completed
        </p>
        <div className='flex'>
            {tasks.length === 0 ? (
                <p>No goals set for tomorrow</p>
            ) : (
                <>
                <div className={`flex flex-wrap bg-neutral-800 rounded-3xl ${loading && 'animate-pulse'}`}>
                {tasks.map((task) => (
                    <div key={task.id} 
                        onClick={() => updateTaskStatus(task.id, task.completed)}
                        className={`py-4 px-8 max-md:py-2 max-md:px-4 cursor-pointer select-none 
                        first:rounded-l-3xl last:rounded-r-3xl border-r-2 border-r-neutral-900 last:border-r-0
                        hover:bg-blue-500 target:animate-pulse
                        `}>
                            <div className={`text-5xl max-md:text-2xl
                            ${task.completed === false ? 'grayscale' : 'grayscale-0'}
                            ${updating === task.id ? 'animate-pulse' : ''}`}>
                                {task.emoji
                            }</div>
                    </div>     
                ))}
                </div>
                <div className='flex flex-col justify-around'>
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
    </div>
    
  )
}

export default TasksBar