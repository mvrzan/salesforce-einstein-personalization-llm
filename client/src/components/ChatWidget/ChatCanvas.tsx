import { useEffect, useState } from "react";
import useBearStore from "@/hooks/useBearStore";
import useSalesforceInteractions from "@/hooks/useSalesforceInteractions";

import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

import type { Channel as StreamChannel, User } from "stream-chat";
import { useCreateChatClient, Chat, Channel, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import notifyAi from "../../utils/notifyAi";

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
  const { userChatMessage, personalizationProductRecommendations } = useSalesforceInteractions();
  const updateRecommendedProducts = useBearStore((state) => state.updateRecommendedProducts);
  const setTheme = useBearStore((state) => state.setTheme);

  useEffect(() => {
    const chatChannel = client?.channel("messaging", "Einstein_Personalization", {
      image: "https://getstream.io/random_png/?name=react",
      name: "Service support",
      members: [userId],
    });

    setChannel(chatChannel);

    const handleChatEvent = (event: { message?: { text?: string } }) => {
      if (!event.message?.text) return;

      const deviceId = window?.SalesforceInteractions.getAnonymousId();
      userChatMessage(event.message.text);
      notifyAi(deviceId);

      const timeoutId = setTimeout(() => {
        const getProducts = async () => {
          const products = await personalizationProductRecommendations(["recsEP1"]);
          updateRecommendedProducts(products);
          const productCategory = products[0].ssot__PrimaryProductCategory__c;
          setTheme(productCategory);
          toaster.create({
            duration: 5000,
            title: `Personalization for ${productCategory} has been set!`,
            type: "success",
          });
        };

        getProducts();
      }, 5000);

      return () => clearTimeout(timeoutId);
    };

    chatChannel?.on("message.new", handleChatEvent);

    return () => {
      chatChannel?.off("message.new", handleChatEvent);
    };
  }, [client, personalizationProductRecommendations, setTheme, updateRecommendedProducts, userChatMessage]);

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
      <Toaster />
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
