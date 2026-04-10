"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Interview() {

  const {interview_id} = useParams();
  console.log(interview_id)

  const [interviewData , setInterviewData] = useState();
  const [userName,setUserName] = useState();
  const [loading,setLoading] = useState(false);
  const {InterviewInfo,setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(()=>{
    interview_id&&GetInterviewDetails();
  },[interview_id])

  const GetInterviewDetails = async()=>{

      setLoading(true);

      try{  
      let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("jobPosition ,jobDescription,duration,type")
      .eq('interview_id',interview_id)

      setInterviewData(Interviews[0])
      setLoading(false);

        if(Interviews?.length == 0){
          toast('Incorrect Interview Link')
          return;
        }
      }

      catch(e){
        
        setLoading(false);
        toast('Incorrect Interview Link')
      }
      
  }

  const onJoinInterview=async()=>{
    setLoading(true)
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select("*")
    .eq('interview_id',interview_id)

    console.log(Interviews[0]);
    setInterviewInfo({
      userName:userName,
      InterviewData: Interviews[0],
    });
    router.push('/interview/'+interview_id+'/start')
    setLoading(false)
  }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-6'>
        <div className='flex flex-col items-center
             justify-center border rounded-xl bg-white
              p-7  lg:px-33 xl:px-52 mb-20'>
             <Image src={'/logo.png'} alt='logo' width={200} height={100}  
                   className='w-[140px] scale-110 mb-1'/>

                   <h2 className='-mt-10'>AI-Powered Interview Platform</h2>

                   <Image src={'/Interview.png'} alt='Interview' width={500} height={500}
                          className='w-[350px] my-6'  
                   />

                   <h2 className='text-xl font-bold -mt-3'>{interviewData?.jobPosition}</h2>
                   <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>

                  <div className='w-full'>
                      <h2>Enter Your Full Name</h2>
                      <Input placeholder='e.g. John Wick' onChange={(event)=>setUserName(event.target.value)} />
                  </div>

                  <div className=' p-3 bg-blue-100 flex gap-4 border rounded-xl mt-7'>
                    <Info/>
                  <div>
                    <h2 className='font-bold'>Before You Begin</h2>

                    <ul className='mt-2'>
                      <li className='text-sm text-primary'>-Test Your Camera And Microphone</li>
                      <li className='text-sm text-primary'>-Ensure You Have A Stable Internet Connection</li>
                      <li className='text-sm text-primary'>-Find A Quiet Place For Interview</li>
                    </ul>
                  </div>
                  </div>

                  <Button className={'mt-5 w-full'}
                    disabled = {loading || !userName}
                    onClick ={()=>onJoinInterview()}
                  ><Video/> {loading&&<Loader2Icon/>}Join Interview</Button>
           
           </div>
    </div>
  )
}

export default Interview
