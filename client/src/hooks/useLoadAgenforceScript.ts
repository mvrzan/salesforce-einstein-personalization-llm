import { readFromLocalStorage } from "@/utils/localStorageUtil";
import useAgentforceScript from "./useAgentforceScript";
import useBearStore from "./useBearStore";

const useLoadAgentforceScript = () => {
  const configureAgentforceScriptUrl = useAgentforceScript();
  const setChatSelector = useBearStore((state) => state.setChatSelector);

  const loadAgentforceScript = () => {
    const existingScript = document.querySelector('script[src*="assets/js/bootstrap.min.js"]');
    if (!existingScript) {
      const config = readFromLocalStorage("agentforceConfig");
      if (!config) return;

      try {
        const parsedConfig = JSON.parse(config);
        configureAgentforceScriptUrl(
          parsedConfig.orgId,
          parsedConfig.scriptUrl,
          parsedConfig.instanceUrl,
          parsedConfig.embeddingUrl,
          parsedConfig.embeddingApiName
        );
        setChatSelector(true);
      } catch (error) {
        console.error("Failed to parse Agentforce config:", error);
      }
    }
  };

  return loadAgentforceScript;
};

export default useLoadAgentforceScript;
