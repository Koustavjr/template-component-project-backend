import Router from "express";
import { aiGeneratedComponentController } from "../controllers/ai.controller.js";

const router = Router();


router.post("/generate", aiGeneratedComponentController);

export default router;
