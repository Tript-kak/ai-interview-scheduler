"use client"
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";

function FormContainer({onHandleInputChange}) {

    const [interviewType,setInterviewType] = useState([]);

    useEffect(()=>{
        if(interviewType){
            onHandleInputChange('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType=(type)=>{
        const data = interviewType.includes(type);

        if(!data){
            setInterviewType(prev=> [...prev,type])
        }

        else{
            const result = interviewType.filter(item=>item!=type);
            setInterviewType(result);
        }
    }
  return (
    <div className="bg-white p-5 border border-gray-200 rounded-xl relative">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input placeholder="e.g. Full Stack Developer" className={"mt-2"} 
        onChange = {(event)=>onHandleInputChange('JobPosition',event.target.value)}/>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea placeholder="Enter Job Description" className="h-52 mt-2" 
        onChange = {(event)=>onHandleInputChange('JobDescription',event.target.value)}/>
      </div>

      <div className="mt-5 ">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        
          <Select onValueChange={(value)=>onHandleInputChange('Duration' , value)}>
            <SelectTrigger className="w-full mt-2 bg-white">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent position="popper" align="start" className={" bg-white z-50 shadow-md border rounded-md"}>
              <SelectGroup>
                <SelectItem value="5Min">5 Min</SelectItem>
                <SelectItem value="15Min">15 Min</SelectItem>
                <SelectItem value="30Min">30 Min</SelectItem>
                <SelectItem value="45Min">45 Min</SelectItem>
                <SelectItem value="60Min">60 Min</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className='flex gap-3 flex-wrap mt-2'>
            {InterviewType.map((type,index)=>(
                <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border border-gray-300 rounded-2xl
                hover:bg-slate-100
                ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'}
                `} 
                onClick={()=> AddInterviewType(type.title)}>
                    
                    <type.icon className='h-4 w-4'/>
                    <span>{type.title}</span>
                </div>
            ))}
        </div>
       
      </div> 
      <div className='mt-7 flex justify-end'>
      <Button>Generate Questions <ArrowRight/></Button>
      </div>
    </div>
  );
}

export default FormContainer;
