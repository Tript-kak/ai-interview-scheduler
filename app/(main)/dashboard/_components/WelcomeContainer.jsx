"use client"
import Image from 'next/image'
import { useUser } from '@/app/provider'
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser();
  return (
    <div className='bg-white px-5 py-3 rounded-2xl flex justify-between items-center'>
        <div  >
            <h2 className='text-lg font-bold'>Welcome Back , {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
        </div>
        {user &&<img
  src={user.picture}
  alt="UserAvatar"
  className="w-12 h-12 rounded-full"
  referrerPolicy="no-referrer"
/>}
    </div>
  )
}

export default WelcomeContainer
