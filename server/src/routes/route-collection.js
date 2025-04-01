import { Router } from "express";
import { notificationService } from "../controllers/notification-service.js";
import { updateService } from "../controllers/update-service.js";
import initSalesforceSdk from "../middleware/heroku-service-mesh.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const router = Router();

const initMiddleware = async () => {
  try {
    console.log(`${getCurrentTimestamp()} 🔧 - Initializing Salesforce routes...`);
    const { salesforceMiddleware, withSalesforceConfig, asyncMiddleware } = await initSalesforceSdk();

    router.post(
      "/v1/notification-service",
      withSalesforceConfig({ parseRequest: false }),
      salesforceMiddleware,
      notificationService
    );

    router.post(
      "/v1/update-service",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      updateService
    );

    console.log(`${getCurrentTimestamp()} ✅ Salesforce routes registered successfully!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ Failed to initialize Salesforce routes: ${error.message}`);
  }
};

initMiddleware();

export default router;
