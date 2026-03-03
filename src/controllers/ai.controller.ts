import { aiGeneratedComponent } from "../models/ai.model.js";
import type { Request, Response } from "express";


export const aiGeneratedComponentController = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required"
            })
        }
        const component = await aiGeneratedComponent(prompt);
        return res.status(200).json(component);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}