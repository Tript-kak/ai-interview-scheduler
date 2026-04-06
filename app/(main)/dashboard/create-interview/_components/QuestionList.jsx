import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData , onCreateLink}) {
  const [loading, setLoading] = useState(true);
  const [questionList,setQuestionList] = useState([]);
  const {user}=useUser();
  const [saveLoading , setSaveloading] = useState(false);


  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);


  const GenerateQuestionList = async () => {
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log(result.data.content);
      const Content = result.data.content
      const FINAL_CONTENT = Content.replace('```json','').replace('```','')
      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions)
      setLoading(false)
    } catch (e) {
        
      toast("Server Error, Try Again!");
      setLoading(false);
    }
  };

  const onFinish = async()=>{

    setSaveloading(true);

    const interview_id = uuidv4();
    
const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { 
      ...formData,
      questionList: questionList,
      userEmail: user?.email,
      interview_id: interview_id
    },
  ])
  .select()

  setSaveloading(false);

  onCreateLink(interview_id)
          
  }
  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary border-gray-100 flex-gap-5">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Question</h2>
            <p className="text-primary">
              Our AI Is Crafting Personalized Questions Based On Your Job
              Position{" "}
            </p>
          </div>
         
        </div>
      )}

       {questionList?.length>0 &&
       <div>
          <QuestionListContainer questionList={questionList}/>
       </div>
          }
          <div className='flex justify-end mt-10'>
              <Button onClick={()=>onFinish()} disabled = {saveLoading}>
              {saveLoading&& <Loader2 className = 'animate-spin'/>}
            Create Interview Link & Finish</Button>
          </div>
          
    </div>
  );
}

export default QuestionList;
