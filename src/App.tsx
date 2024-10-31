import { Theme } from "@chakra-ui/react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
// import ChatComponent from "./components/Stream/ChatComponent";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Theme appearance="light">
      <Header />
      <Hero />
      <Body />
      {/* <ChatComponent /> */}
      <Footer />
    </Theme>
  );
};

export default App;
