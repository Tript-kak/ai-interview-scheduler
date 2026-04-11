"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone, Timer } from 'lucide-react';
import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Interview from '../page';
import Vapi from '@vapi-ai/web';
import QuestionList from '@/app/(main)/dashboard/create-interview/_components/QuestionList';
import AlertConfirmation from './_components/AlertConfirmation';
import { useRef } from "react";

function StartInterview() {
    const {InterviewInfo,setInterviewInfo} = useContext(InterviewDataContext);
   const vapiRef = useRef(null);

   useEffect(() => {
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }
}, []);
    console.log(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)
    console.log("FULL:", InterviewInfo);
    
    
    useEffect(()=>{
        InterviewInfo&&startCall();
    },[InterviewInfo])

    const stopInterview =()=>{

    } 
    
   const startCall = async() => {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
  console.log("Devices:", devices);
    const questionList = InterviewInfo?.InterviewData?.questionList
        ?.map(item => item?.question)
        .join(",");

    console.log(questionList);
    console.log("FULL InterviewInfo:", InterviewInfo);
console.log("InterviewData:", InterviewInfo?.InterviewData);
console.log("questionList:", InterviewInfo?.InterviewData?.questionList);

 const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: `Hi ${InterviewInfo?.userName}, let's start your interview.

First question:
${InterviewInfo?.InterviewData?.questionList?.[0]?.question}`,

    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
    },
    
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your  `+InterviewInfo?.InterviewData?.jobPosition+` interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: `+questionList+`
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
            },
        ],
    },
};

vapiRef.current.start(assistantOptions)

}
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
        <h2 className='font-bold text-xl flex justify-between items-center'>AI Interview Session
            <span className='flex gap-2 items-center'>
                <Timer/>
                00:00:00
            </span>
        </h2>

        <div className='grid gird-cols-1 md:grid-cols-2 gap-7 mt-5'>

            <div className='bg-white h-[400px] rounded-lg border flex  flex-col gap-3 items-center justify-center'>
                
                <Image src={'/ai.png'} alt='ai'
                
                width={100}
                height={100} 
                className='w-[60px] h-[60px] rounded-full object-cover' />

            <h2> AI Recuiter</h2>
            </div>

             <div className='bg-white h-[400px] rounded-lg border flex justify-center items-center flex-col gap-3'>
                
               <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5 '>{InterviewInfo?.userName[0]}</h2>
                <h2> {InterviewInfo?.userName} </h2>
            </div>

    </div>

    <div className='flex items-center justify-center gap-5'>
        <Mic className='h-12 w-12 p-3 text-white bg-gray-500 rounded-full cursor-pointer'/>
        <AlertConfirmation stopInterview={()=>stopInterview()}>
        <Phone className='h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer'
         />
         </AlertConfirmation>
    </div>
    <h2 className='text-sm text-gray-400 text-center mt-5'>Interview In Progress......</h2>
    </div>

    
  )
}

export default StartInterview

