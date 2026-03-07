import { getComponent } from "../models/components.model.js";
import { Request, Response } from "express";

export const getComponentController = async (req: Request, res: Response) => {
    try {
        const name = req.params.name as string;
        if (!name) {
            return res.status(400).json({
                message: "Component name is required"
            })
        }
        const component = await getComponent(name);
        if (!component) {
            return res.status(404).json({
                message: "Component not found"
            })
        }
        return res.status(200).json(component);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}