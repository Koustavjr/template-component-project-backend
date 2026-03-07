import OpenAI from "openai";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const aiGeneratedComponent = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `
        You are a component generator.
        Return JSON in this exact format:
        {
  "name": "login-form",
  "dependencies": ["zod", "lucide-react"],
  "files": [
    {
      "path": "components/auth/login-form.tsx",
      "content": "export const LoginForm = () => { ... }"
    },
    {
      "path": "components/auth/login-schema.ts",
      "content": "import { z } from 'zod'; export const schema = ..."
    }
  ]
}
        `
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        if (!response || !response.choices.length) {
            throw new Error("Failed to generate component");
        }
        return JSON.parse(response?.choices[0]?.message?.content || "{}");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

