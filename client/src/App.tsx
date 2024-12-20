import { useEffect } from "react";
import useScript from "./hooks/useScript";
import useBearStore from "./hooks/useBearStore";
import useAgentforceScript from "./hooks/useAgentforceScript";

import { Theme } from "@chakra-ui/react";
import { readFromLocalStorage } from "./utils/localStorageUtil";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import AgentChatWidget from "./components/ChatWidget/AgentChatWidget";

const App = () => {
  const configureScriptUrl = useScript();
  const configureAgentforceScriptUrl = useAgentforceScript();

  const theme = useBearStore((state) => (state.theme === "dark" || state.theme === "light" ? state.theme : "light"));
  const chatSelector = useBearStore((state) => state.chatSelector);
  const setChatSelector = useBearStore((state) => state.setChatSelector);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');
    if (!existingScript) {
      const scriptUrl = readFromLocalStorage("scriptUrl");

      if (scriptUrl) {
        configureScriptUrl(scriptUrl);
      }
    }

    const existingAgentforceScript = document.querySelector('script[src*="assets/js/bootstrap.min.js"]');

    if (!existingAgentforceScript) {
      const agentforceConfig = readFromLocalStorage("agentforceConfig");

      if (agentforceConfig) {
        const agentforceScriptUrl = JSON.parse(agentforceConfig);
        configureAgentforceScriptUrl(
          agentforceScriptUrl?.orgId,
          agentforceScriptUrl?.scriptUrl,
          agentforceScriptUrl?.instanceUrl,
          agentforceScriptUrl?.embeddingUrl,
          agentforceScriptUrl?.embeddingApiName
        );

        setChatSelector(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Theme appearance={theme}>
      <Header />
      <Hero />
      <Body />
      <Footer />
      {chatSelector === "external" && <ChatWidget />}
      <AgentChatWidget />
    </Theme>
  );
};

export default App;
