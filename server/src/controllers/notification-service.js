import sfAuthToken from "../utils/sfAuthToken.js";
import { parseDataGraph } from "../utils/parseDataGraphData.js";

export const notificationService = async (req, res) => {
  const { instanceUrl, accessToken } = await sfAuthToken();
  const deviceId = req.body.deviceId;

  try {
    const dataGraphConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const dataGraphResponse = await fetch(
      `${instanceUrl}/services/data/v61.0/ssot/data-graphs/data/RealTimeId?lookupKeys=UnifiedLinkssotIndividualMcp__dlm.SourceRecordId__c=${deviceId}`,
      dataGraphConfig
    );

    if (!dataGraphResponse.ok) {
      throw new Error("Error fetching Data Graph data");
    }

    const data = await dataGraphResponse.json();

    const chatMessages = parseDataGraph(data);

    console.log(chatMessages);

    const flowConfig = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatMessages),
    };

    const flowResponse = await fetch(
      `${instanceUrl}/services/data/v61.0/actions/custom/flow/${process.env.AI_FLOW_NAME}`,
      flowConfig
    );

    console.log("string", flowConfig.body);

    if (!flowResponse.ok) {
      throw new Error("Flow invocation failed!");
    }

    const flowData = await flowResponse.json();

    console.log(flowData);

    res.status(200).json("Flow triggered successfully!");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send(error);
  }
};
