import { useState } from "react";

import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";

import ChatCanvas from "./ChatCanvas";

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const ChatWidget = () => {
  const [chatIsOpen, setChatIsOpen] = useState(false);

  const openChatHandler = () => {
    setChatIsOpen(!chatIsOpen);
  };

  return (
    <>
      <HStack>
        <Button
          colorPalette="purple"
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex="1000"
          borderRadius="30px"
          onClick={openChatHandler}
        >
          {chatIsOpen ? (
            <>
              <IoMdCloseCircle /> Close Chat
            </>
          ) : (
            <>
              <IoChatbubbleEllipsesSharp /> Start Chat
            </>
          )}
        </Button>
      </HStack>
      {chatIsOpen && <ChatCanvas />}
    </>
  );
};

export default ChatWidget;
