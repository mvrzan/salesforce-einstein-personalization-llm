import { writeToLocalStorage } from "../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    embeddedservice_bootstrap: {
      settings: {
        language: string;
      };
      init: (orgId: string, embeddingApiName: string, embeddingUrl: string, options: { scrt2URL: string }) => void;
    };
  };

const useAgentforceScript = () => {
  const configureAgentforceScriptUrl = (
    orgId: string,
    scriptUrl: string,
    instanceUrl: string,
    embeddingUrl: string,
    embeddingApiName: string
  ) => {
    const script = document.createElement("script");
    script.src = scriptUrl;

    script.onload = () => {
      try {
        console.log("🤖 Initializing Agentforce...");

        window.embeddedservice_bootstrap.settings.language = "en_US";
        window.embeddedservice_bootstrap.init(orgId, embeddingApiName, embeddingUrl, {
          scrt2URL: instanceUrl,
        });

        console.log("🤖 Agentforce successfully initialized!");
      } catch (error) {
        console.error("❌ There was an error when initializing Agentforce:", error);
      }
    };

    document.head.appendChild(script);

    writeToLocalStorage("agentforceConfig", {
      orgId,
      scriptUrl,
      instanceUrl,
      embeddingUrl,
      embeddingApiName,
    });
  };

  return configureAgentforceScriptUrl;
};

export default useAgentforceScript;
