import sfAuthToken from "../utils/sfAuthToken.js";
import { parseDataGraph } from "../utils/parseDataGraphData.js";

export const notificationService = async (req, res) => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(`${date} 🪬 Request received...`);

  const { instanceUrl, accessToken } = await sfAuthToken();

  console.log(`${date} 🔑 Salesforce auth token successfully retrieved!`);

  const deviceId = req.body.deviceId;

  try {
    const dataGraphConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(`${date} 📈 Fetching Data Graph information...`);

    const dataGraphResponse = await fetch(
      `${instanceUrl}/services/data/v61.0/ssot/data-graphs/data/RealTimeId?lookupKeys=UnifiedLinkssotIndividualMcp__dlm.SourceRecordId__c=${deviceId}`,
      dataGraphConfig
    );

    if (!dataGraphResponse.ok) {
      throw new Error(
        `There was an error while fetching Data Graph data: ${dataGraphResponse.status} - ${dataGraphResponse.statusText}`
      );
    }

    console.log(`${date} 📉 Data Graph data successfully fetched. Parsing data and extracting chat messages...`);

    const data = await dataGraphResponse.json();
    const chatMessages = parseDataGraph(data);

    console.log(`${date} 🔧 Data Graph data successfully parsed!`);

    const flowConfig = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatMessages),
    };

    console.log(`${date} 🤖 Invoking Salesforce flow...`);

    const flowResponse = await fetch(
      `${instanceUrl}/services/data/v61.0/actions/custom/flow/${process.env.AI_FLOW_NAME}`,
      flowConfig
    );

    if (!flowResponse.ok) {
      throw new Error(
        `There was an error when invoking the Salesforce flow: ${flowResponse.status} -${flowResponse.statusText}`
      );
    }

    console.log(`${date} ✅ Salesforce flow was successfully invoked!`);

    res.status(200).json("Flow triggered successfully!");
  } catch (error) {
    console.error("❌ Error occurred:", error);
    res.status(500).send(error);
  }
};
