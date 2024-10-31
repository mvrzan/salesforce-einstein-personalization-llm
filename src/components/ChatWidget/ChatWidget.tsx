import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const ChatWidget = () => {
  return (
    <HStack>
      <Button colorPalette="purple" position="fixed" bottom="20px" right="20px" zIndex="1000" borderRadius="30px">
        <IoChatbubbleEllipsesSharp /> Start Chat
      </Button>
    </HStack>
  );
};

export default ChatWidget;
