import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const { jobPosition, jobDescription, duration, type } = body;

    if (!jobPosition || !jobDescription || !duration || !type) {
      return NextResponse.json(
        { error: "Fill all details" },
        { status: 400 }
      );
    }

    console.log("KEY:", process.env.OPENROUTER_API_KEY);
    console.log("ENV TEST:", process.env.OPENROUTER_API_KEY);

    const FINAL_PROMPT = QUESTION_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', type);

    const openai = new OpenAI({
     
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
        defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Interview App",
  },
       
    })

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3.6-plus:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      
    });

   
    return NextResponse.json(completion.choices[0].message)
  

  } catch (e) {
      
    console.log("Error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}