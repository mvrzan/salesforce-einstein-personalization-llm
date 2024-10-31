import { Box, Image, HStack, Spacer, Flex, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import { HiMiniUserCircle } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";

import expertsLogo from "../../assets/experts-logo.png";

const Header = () => {
  return (
    <Flex as="header" height="100px" bg="#673ab7" width="100%">
      <HStack gap="30px" marginBottom="10px" marginTop="10px" width="100%" marginX="22px">
        <Box>
          <LinkBox>
            <LinkOverlay href="/">
              <HStack>
                <Image src={expertsLogo} alt="header image" height="60px" width="75px" />
                <Text fontSize="25px" fontWeight="extrabold" color="white">
                  Experts
                </Text>
              </HStack>
            </LinkOverlay>
          </LinkBox>
        </Box>
        <Button colorScheme="black" variant="plain">
          <Text fontSize="15px" fontWeight="extrabold" color="white">
            Home
          </Text>
        </Button>
        <Button colorScheme="black" variant="plain">
          <Text fontSize="15px" fontWeight="extrabold" color="white">
            Customer service
          </Text>
        </Button>
        <Button colorScheme="black" variant="plain">
          <Text fontSize="15px" fontWeight="extrabold" color="white">
            About
          </Text>
        </Button>
        <Spacer />
        <HStack gap="2px">
          <Button colorScheme="black" variant="plain" color="white">
            <FaGithub />
          </Button>
          <Button colorScheme="black" variant="plain" color="white">
            <HiMiniUserCircle />
          </Button>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
