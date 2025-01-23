import { readFromLocalStorage } from "@/utils/localStorageUtil";
import useScript from "./useScript";

const useLoadDataCloudScript = () => {
  const configureScriptUrl = useScript();

  const loadDataCloudScript = () => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');
    if (!existingScript) {
      const scriptUrl = readFromLocalStorage("scriptUrl");
      if (scriptUrl) {
        configureScriptUrl(scriptUrl);
      }
    }
  };

  return loadDataCloudScript;
};

export default useLoadDataCloudScript;
