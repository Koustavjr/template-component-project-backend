import { Router } from "express";
import { getComponentController } from "../controllers/components.controller.js";
const router = Router();


router.get("/:name", getComponentController);

export default router;