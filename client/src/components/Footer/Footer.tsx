import { Image, Flex, Text, VStack, HStack, Separator, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import expertsLogo from "../../assets/experts-logo.png";

const Footer = () => {
  return (
    <Box>
      <Separator />
      <Flex align="center" justify="center" bg="white" height="100%" paddingY="50px">
        <VStack>
          <HStack>
            <Text color="black" fontWeight="extrabold" fontSize="2xl">
              Einstein Personalization demo with
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
          <HStack>
            <Button colorPalette="purple">
              <Text fontSize="13px" fontWeight="extrabold">
                Home
              </Text>
            </Button>
            <Button colorPalette="purple">
              <Text fontSize="13px" fontWeight="extrabold">
                Customer service
              </Text>
            </Button>
            <Button colorPalette="purple">
              <Text fontSize="13px" fontWeight="extrabold">
                About
              </Text>
            </Button>
          </HStack>
          <Image src={expertsLogo} alt="header image" height="60px" width="75px" />
          <Text color="black" fontWeight="lighter" fontSize="10px">
            © 2024 Experts Team. All rights reserved.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Footer;
