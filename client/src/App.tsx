import { useEffect } from "react";
import useScript from "./hooks/useScript";

import { readFromLocalStorage } from "./utils/localStorageUtil";

import { Theme } from "@chakra-ui/react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import AgentChatWidget from "./components/ChatWidget/AgentChatWidget";

const App = () => {
  const configureScriptUrl = useScript();
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');
    if (existingScript) {
      return;
    }

    const scriptUrl = readFromLocalStorage("scriptUrl");

    if (scriptUrl) {
      configureScriptUrl(scriptUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Theme appearance="light">
      <Header />
      <Hero />
      <Body />
      <Footer />
      <ChatWidget />
      <AgentChatWidget />
    </Theme>
  );
};

export default App;
