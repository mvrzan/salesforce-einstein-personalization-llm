import { Flex, HStack, Text, VStack } from "@chakra-ui/react";

const Body = () => {
  return (
    <Flex align="start" justify="center" paddingX="100px" bg="white" height="50vh" marginTop="20px">
      <VStack>
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          bgClip="text"
          css={{ background: "linear-gradient(to right, #66B2FF, #A366FF, #CC99FF)" }}
        >
          Einstein Personalization
        </Text>
        <Text fontSize="2xl" fontWeight="normal" fontStyle="italic">
          Discovery how you can user real-time Einstein Personalization
        </Text>
        <HStack>
          <Text fontSize="2xl" fontWeight="normal" fontStyle="italic">
            combined with
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="extrabold"
            bgClip="text"
            css={{ background: "linear-gradient(to right, #66B2FF, #A366FF, #CC99FF)" }}
          >
            Agentforce!
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Body;
