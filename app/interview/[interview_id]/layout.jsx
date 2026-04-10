"use client"
import React, { useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function InterviewLayout({children}) {
 const [InterviewInfo,setInterviewInfo] = useState(); 

  return (
    <InterviewDataContext.Provider value= {{InterviewInfo,setInterviewInfo}}>
    <div className='bg-gray-100 scale-100 origin-top'>
        <InterviewHeader/>
        {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
