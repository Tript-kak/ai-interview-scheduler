import React from 'react'
import Image from 'next/image'
function InterviewHeader() {
  return (
    <div className=' shadow-sm'>
      <Image src={'/logo.png'} alt='logo' width={200} height={200} 
            className='w-[140px]'/>
    </div>
  )
}

export default InterviewHeader
