export interface ProductType {
  ssot__Id__c: string;
  ImageURL__c: string;
  ssot__Name__c: string;
  ssot__PrimaryProductCategory__c: string;
}

declare global {
  export interface Window {
    SalesforceInteractions: {
      init: (config: { consents: { provider: string; purpose: string; status: string }[] }) => Promise<void>;
      ConsentPurpose: { Tracking: string };
      ConsentStatus: { OptIn: string };
      getAnonymousId: () => string;
    };
    embeddedservice_bootstrap: {
      settings: {
        language: string;
      };
      prechatAPI: {
        setHiddenPrechatFields: (fields: { [key: string]: string }) => void;
      };
      init: (orgId: string, embeddingApiName: string, embeddingUrl: string, options: { scrt2URL: string }) => void;
      removeMarkup: () => void;
      generateMarkup: () => void;
    };
  }
}
