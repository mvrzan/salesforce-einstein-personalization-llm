import { useState } from "react";

import { HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import AgentChatCanvas from "./AgentChatCanvas";

import { BsHeadset } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const AgentChatWidget = () => {
  const [agentChatIsOpen, setAgentChatIsOpen] = useState(false);

  const openChatHandler = () => {
    setAgentChatIsOpen(!agentChatIsOpen);
  };

  return (
    <>
      <HStack>
        <Button
          colorPalette="purple"
          position="fixed"
          bottom="20px"
          left="20px"
          zIndex="1000"
          borderRadius="30px"
          onClick={openChatHandler}
        >
          {agentChatIsOpen ? (
            <>
              <IoMdCloseCircle /> Close Agent Chat
            </>
          ) : (
            <>
              <BsHeadset /> Start Agent Chat
            </>
          )}
        </Button>
      </HStack>
      {agentChatIsOpen && <AgentChatCanvas />}
    </>
  );
};

export default AgentChatWidget;
