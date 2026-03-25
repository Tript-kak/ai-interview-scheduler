"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { SupabaseClient } from '@supabase/supabase-js'
function login() {
  
  

    const SignInWithGoogle=async()=>{
      const {error}=await supabase.auth.signInWithOAuth({
        provider: 'google'
      })

      if(error){
        console.error('Error:', error.message)
      }
    }  
    return (
    
    <div className='flex flex-col justify-center items-center h-screen'>
    

    <div className=' flex flex-col items-center border rounded-2xl p-8'> 
        <div>
        <Image src={'/logo.png'} alt='logo' 
        width={400} 
        height={100}
        className='w-[180px]' ></Image>
      </div>

      <Image src={'/login.png'} alt='login'
            width={600}
            height={400}

            className='w-[400px] h-[250px] rounded-2xl'
      ></Image>
      <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AiCruiter</h2>
      <p className='text-gray-500 text-center'>Sign In With Google Authentication </p>
      <Button className= 'mt-7 w-full' onClick = {SignInWithGoogle}>Login with Google</Button>
      </div>
    </div>
  )
}

export default login
