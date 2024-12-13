import { Router } from "express";
import { notificationService } from "../controllers/notification-service.js";

const router = Router();

router.post("/v1/notification-service", notificationService);

export default router;
