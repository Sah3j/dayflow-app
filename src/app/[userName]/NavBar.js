import React from 'react'
import { SignOut } from "../Actions.js"
import Image from 'next/image'

function NavBar( {userName} ) {
  return (
    <div className='flex justify-between bg-blue-600 py-2 px-10 items-center
    rounded-b-xl'>
        <Image src="/logo.png" alt="logo" width="80" height="40" />
        <div className='flex align-middle'>
            <p className='mr-4 font-medium text-blue-200'>{userName}</p>
            <div className="">
                <SignOut/>
            </div>
        </div>
    </div>
  )
}

export default NavBar