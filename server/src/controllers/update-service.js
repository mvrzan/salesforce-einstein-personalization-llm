import crypto from "crypto";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

export const updateService = async (req, res) => {
  console.log(`${getCurrentTimestamp()} 🪬 Request received for Einstein Personalization update...`);
  const { deviceId, catalogId } = req?.body;

  try {
    if (!deviceId || !catalogId) {
      console.error(`${getCurrentTimestamp()} ❌ Missing required parameters`);

      return res.status(400).json({
        error: "Missing required parameters: deviceId and catalogId are required",
      });
    }

    console.log(`${getCurrentTimestamp()} 🔄 Generating event data for device: ${deviceId} and catalog: ${catalogId}`);

    const eventId = crypto.randomUUID();
    const sessionId = crypto.randomUUID();
    const currentDateTime = new Date().toISOString();

    console.log(`${getCurrentTimestamp()} 📝 Creating event payload...`);

    const event = {
      eventId,
      dateTime: currentDateTime,
      sessionId,
      deviceId,
      interactionName: "identityAttributeUpdate",
      sourceUrl: "https://www.salesforce.com",
      sourceUrlReferrer: "",
      sourceChannel: "Web",
      eventType: "identity",
      lastProductEngaged: catalogId,
      isAnonymous: 0,
      category: "Profile",
    };

    const payload = {
      events: [event],
    };

    const jsonString = JSON.stringify(payload);
    const base64EncodedData = Buffer.from(jsonString).toString("base64");
    const formBody = `event=${encodeURIComponent(base64EncodedData)}`;

    console.log(`${getCurrentTimestamp()} 📤 Sending request to the hot layer...`);

    const endpointUrl = `${process.env.DATA_CLOUD_TENANT_URL}/web/events/${process.env.DATA_CLOUD_APP_ID}`;

    const fetchResponse = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (!fetchResponse.ok) {
      throw new Error(
        `There was an error while updating Data Graph data: ${fetchResponse.status} - ${fetchResponse.statusText}`
      );
    }

    if (fetchResponse.status === 204) {
      console.log(`${getCurrentTimestamp()} ✅ Event successfully sent to Data Cloud hot layer!`);

      return res.status(200).json({
        success: true,
        message: "Event successfully sent to Data Cloud hot layer!",
      });
    }

    const data = await fetchResponse?.json();

    console.log(`${getCurrentTimestamp()} ✅ Event successfully sent to Data Cloud hot layer!`);

    return res.status(200).json({
      success: true,
      message: "Event successfully sent to Data Cloud hot layer!",
      data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ Error occurred:`, error);

    return res.status(500).json({
      error: "Failed to process request",
      details: error.message,
    });
  }
};
