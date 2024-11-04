import { Theme } from "@chakra-ui/react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
// import ChatComponent from "./components/Stream/ChatComponent";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import AgentChatWidget from "./components/ChatWidget/AgentChatWidget";

const App = () => {
  return (
    <Theme appearance="light">
      <Header />
      <Hero />
      <Body />
      {/* <ChatComponent /> */}
      <Footer />
      <ChatWidget />
      <AgentChatWidget />
    </Theme>
  );
};

export default App;
