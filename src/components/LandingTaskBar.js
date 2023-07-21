'use client'

import React, { useState } from 'react'

function LandingTaskBar() {
  const [tasks, setTasks] = useState([
    {key:0, emoji: '🏋🏻‍♀️', description: 'Workout', completed: false},
    {key:1, emoji: '🧑🏽‍💻', description: 'Code', completed: false},
    {key:2, emoji: '🥘', description: 'Cook', completed: false},
    {key:3, emoji: '😴', description: 'Sleep', completed: false}
  ])

  const updateComplete = (key) => {
    setTasks(prevTasks => {
      return prevTasks.map(task =>
        task.key === key ? { ...task, completed: !task.completed } : task
      );
    });
  };

  return (
    <div className='mt-8'>
      <p className='text-sm text-gray-400 text-center'>Click the emoji to completed the task</p>
      <div className={`flex flex-wrap bg-neutral-800 rounded-3xl`}>
            {tasks.map((task) => (
                <div key={task.key} 
                    onClick={() => updateComplete(task.key)}
                    className={`py-4 px-8 max-md:py-3 max-md:px-5 cursor-pointer select-none 
                    first:rounded-l-3xl last:rounded-r-3xl border-r-2 border-r-neutral-900 last:border-r-0
                    sm:hover:bg-blue-500 target:animate-pulse
                    `}>
                        <div className={`text-5xl max-md:text-5xl
                        ${!task.completed && 'grayscale'}`}>
                          <p>{task.emoji}</p>
                          <p className='text-sm text-center text-gray-400 text-xs mt-2'>{task.description}</p>
                        </div>
                </div>     
            ))}
            </div>
    </div>
  )
}

export default LandingTaskBar