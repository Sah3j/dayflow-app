import React from 'react'
import { SignIn } from "./Actions.js"
import Image from 'next/image'
import LandingTaskBar from '../components/LandingTaskBar.js'

const LandingPage = () => {

  return (
      <div className='flex flex-col items-center justify-between w-full h-screen bg-slate-900 py-10'>
        <div className='max-md:px-4'>
          <Image src="/landing-logo.png" alt="logo" width="525" height="525" />
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-7xl font-extrabold mb-3 text-slate-100 max-md:text-3xl'>Welcome to DayFlow</h1>
          <h3 className='text-3xl mb-3 text-slate-100 max-md:text-xl'>Get into a routine you love</h3>
          <h4 className='text-2xl text-slate-100 max-md:text-lg'>Using Emojis</h4>
          <LandingTaskBar />
        </div>
        <div>
          <SignIn/>
        </div>
      </div>
  )
}

export default LandingPage