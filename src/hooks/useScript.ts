import { writeToLocalStorage } from "../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    SalesforceInteractions: {
      init: (config: { consents: { provider: string; purpose: string; status: string }[] }) => Promise<void>;
      ConsentPurpose: { Tracking: string };
      ConsentStatus: { OptIn: string };
    };
  };

const useScript = () => {
  const configureScriptUrl = (url: string) => {
    const script = document.createElement("script");
    script.src = url;

    script.onload = async () => {
      try {
        await window.SalesforceInteractions.init({
          consents: [
            {
              provider: "Einstein Personalization Demo",
              purpose: window.SalesforceInteractions.ConsentPurpose.Tracking,
              status: window.SalesforceInteractions.ConsentStatus.OptIn,
            },
          ],
        });
        console.log("Salesforce Interactions initialized");
      } catch (error) {
        console.error("Salesforce Interactions failed to initialize", error);
      }
    };

    document.head.appendChild(script);

    writeToLocalStorage("scriptUrl", url);
  };

  return configureScriptUrl;
};

export default useScript;
