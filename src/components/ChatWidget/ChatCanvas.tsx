import { useEffect, useState } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import useSalesforceInteractions from "@/hooks/useSalesforceInteractions";

import type { Channel as StreamChannel, User } from "stream-chat";
import { useCreateChatClient, Chat, Channel, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

const apiKey = import.meta.env.VITE_API_KEY;
const userId = import.meta.env.VITE_USER_ID;
const userName = import.meta.env.VITE_USER_NAME;
const userToken = import.meta.env.VITE_USER_TOKEN;

const user: User = {
  id: userId,
  name: userName,
  image: "https://cdn-icons-png.flaticon.com/512/4143/4143107.png",
};

const ChatCanvas = () => {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });
  const { userChatMessage } = useSalesforceInteractions();

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", "Einstein_Personalization", {
      image: "https://getstream.io/random_png/?name=react",
      name: "Service support",
      members: [userId],
    });

    setChannel(channel);

    channel?.on((event) => {
      if (!event.message?.text) return;

      userChatMessage(event.message.id, event.message.text);
    });

    return () => {
      channel.stopWatching();
    };
  }, [client, userChatMessage]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Box
      position="fixed"
      bottom="70px"
      right="20px"
      width="400px"
      height="400px"
      borderRadius="8px"
      bg="white"
      zIndex="1000"
      boxShadow="lg"
    >
      <Flex direction="column" height="100%">
        <Box bg="#9333ea" color="white" p="4" borderTopRadius="8px">
          <Text fontSize="lg" fontWeight="bold">
            Chat
          </Text>
        </Box>
        <VStack overflowY="auto" pb="1">
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ChatCanvas;
