import { Router } from "express";
import { getComponentController } from "../controllers/components.controller.js";
const router = Router();
router.get("/r/:name", getComponentController);
export default router;
//# sourceMappingURL=component.route.js.map