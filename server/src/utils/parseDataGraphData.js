export const parseDataGraph = (dataGraph) => {
  const decodeJson = (str) =>
    str
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&#92;/g, "\\");

  const decodedJson = decodeJson(dataGraph.data[0].json_blob__c);
  const parsedJson = JSON.parse(decodedJson);
  const individual = parsedJson.UnifiedLinkssotIndividualMcp__dlm[0].ssot__Individual__dlm;
  const chatMessages = individual[0].Chat_Activities__dlm;
  const deviceId = parsedJson.UnifiedLinkssotIndividualMcp__dlm[0].SourceRecordId__c;

  const formattedChatMessages = chatMessages?.map((chatMessage) => {
    return { chatMessage: chatMessage.chatMessage__c, dateTime: chatMessage.eventDate__c };
  });

  const latestMessage = formattedChatMessages.reduce((latest, current) => {
    return new Date(latest.dateTime) > new Date(current.dateTime) ? latest : current;
  });

  const formattedDataGraphObject = {
    inputs: [
      {
        deviceId: deviceId,
        chatBody: JSON.stringify(latestMessage),
      },
    ],
  };

  return formattedDataGraphObject;
};
