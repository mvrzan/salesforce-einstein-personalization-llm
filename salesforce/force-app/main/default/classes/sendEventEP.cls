public class sendEventEP {
    @InvocableMethod(label='Send Event' description='Send an event to the endpoint using agentforceInput')
    public static void sendEvent(List<InputWrapper> inputList) {
        for (InputWrapper input : inputList) {

            // Clean up input
            String cleanedInput = input.agentforceInput.replace('{!promptOutput}', '').replace('(', '').replace(')', '').trim();

            // Parse input
            List<String> inputParts = cleanedInput.split(',');
            String deviceId = inputParts[0];
            String catalogId = inputParts[1];
    
            // Generate UUIDs
            UUID eventIdUuid = UUID.randomUUID();
            String eventId = eventIdUuid.toString();
            UUID sessionIdUuid = UUID.randomUUID();
            String sessionId = sessionIdUuid.toString();
            System.debug(eventId);
            System.debug(sessionId);
    
            // Get current date/time in ISO8601 format
            String currentDateTime = Datetime.now().formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
            System.debug(currentDateTime);
    
            // Prepare JSON string
            Map<String, Object> event = new Map<String, Object>{
                'eventId' => eventId,
                'dateTime' => currentDateTime,
                'sessionId' => sessionId,
                'deviceId' => deviceId,
                'interactionName' => 'identityAttributeUpdate',
                'sourceUrl' => 'https://www.salesforce.com',
                'sourceUrlReferrer' => '',
                'sourceChannel' => 'Web',
                'eventType' => 'identity',
                'lastProductEngaged' => catalogId,
                'isAnonymous' => 0,
                'category' => 'Profile'
            };
    
            Map<String, Object> payload = new Map<String, Object>{
                'events' => new List<Object>{event}
            };
    
            // Convert to JSON and encode in Base64
            String jsonString = JSON.serialize(payload);
            String base64EncodedData = EncodingUtil.base64Encode(Blob.valueOf(jsonString));
            System.debug(jsonString);
            System.debug(base64EncodedData);
    
            // HTTP POST using application/x-www-form-urlencoded
            HttpRequest req = new HttpRequest();
            String dynamicEndpoint = Einstein_Personalization_Settings__mdt.getInstance('EP_API_Settings').Endpoint_URL__c;
            req.setEndpoint(dynamicEndpoint);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    
            // Construct form-urlencoded body
            String formBody = 'event=' + EncodingUtil.urlEncode(base64EncodedData, 'UTF-8');
            req.setBody(formBody);
    
            Http http = new Http();
            HttpResponse res = http.send(req);
    
            // Debug the response
            System.debug('Response: ' + res.getBody());
        }
    }

    public class InputWrapper {
        @InvocableVariable(required=true label='Agentforce Input' description='Comma-delimited input string containing deviceId and catalogId')
        public String agentforceInput;
    }
}