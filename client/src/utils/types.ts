export interface ProductType {
  ssot__Id__c: string;
  ImageURL__c: string;
  ssot__Name__c: string;
}

declare global {
  export interface Window {
    SalesforceInteractions: {
      getAnonymousId: () => string;
    };
  }
}
