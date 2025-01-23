import { useEffect } from "react";
import useBearStore from "./hooks/useBearStore";
import useLoadDataCloudScript from "./hooks/useLoadDataCloudScript";
import useLoadAgentforceScript from "./hooks/useLoadAgenforceScript";

import { Theme } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import AgentChatWidget from "./components/ChatWidget/AgentChatWidget";

const App = () => {
  const loadDataCloudScript = useLoadDataCloudScript();
  const loadAgentforceScript = useLoadAgentforceScript();

  const theme = useBearStore((state) => (state.theme === "dark" || state.theme === "light" ? state.theme : "light"));
  const chatSelector = useBearStore((state) => state.chatSelector);

  useEffect(() => {
    loadDataCloudScript();
    loadAgentforceScript();
  }, [loadDataCloudScript, loadAgentforceScript]);

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
