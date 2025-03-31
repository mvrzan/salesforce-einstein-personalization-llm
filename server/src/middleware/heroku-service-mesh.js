import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";
const salesforceSdk = await import("@heroku/salesforce-sdk-nodejs");

const customAsyncHandlers = {};

export const initSalesforceSdk = async () => {
  /**
   * Middleware to enrich requests with Salesforce context
   */

  console.log(`${getCurrentTimestamp()} 🏋  - herokuServiceMesh - Loading up the middleware...`);

  const salesforceMiddleware = async (req, res, next) => {
    // Initialize SDK on request
    req.sdk = salesforceSdk.init();

    // Check if route has config to skip parsing
    const skipParsing = req.route?.salesforceConfig?.parseRequest === false;

    if (!skipParsing) {
      try {
        // Enrich request with hydrated SDK APIs
        const parsedRequest = req.sdk.salesforce.parseRequest(req.headers, req.body, req.log || console);
        req.sdk = Object.assign(req.sdk, parsedRequest);
      } catch (error) {
        // Return proper error response instead of crashing
        console.error(`${getCurrentTimestamp()} ❌ Salesforce authentication error:`, error.message);
        return res.status(401).json({
          error: "Invalid request",
          message: "Missing or invalid Salesforce authentication",
        });
      }
    }
    next();
  };

  const withSalesforceConfig = (options = {}) => {
    return (req, _res, next) => {
      req.route.salesforceConfig = options;
      next();
    };
  };

  /**
   * Middleware for handling async requests
   */
  const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
      console.log(`${getCurrentTimestamp()} 🔄 Async response for ${req.method} ${req.path}`);

      const routeKey = `${req.method} ${req.path}`;
      customAsyncHandlers[routeKey] = handler;

      // Send immediate response
      res.status(201).send();

      // Process request asynchronously
      try {
        await handler(req, res);
        req.sdk.asyncComplete = true;
        console.log(`${getCurrentTimestamp()} 🔄 Async ${routeKey} completed!`);
      } catch (error) {
        console.error(`${getCurrentTimestamp()} ❌ Error in async handler for ${routeKey}:`, error);
      }
      next();
    };
  };

  console.log(`${getCurrentTimestamp()} 🦾 - herokuServiceMesh - Middleware ready!`);

  return {
    salesforceMiddleware,
    asyncMiddleware,
    withSalesforceConfig,
  };
};

export default initSalesforceSdk;
