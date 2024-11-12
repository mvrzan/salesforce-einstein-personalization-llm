import { useState } from "react";

import { Box, Image, HStack, Spacer, Flex, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import { HiMiniUserCircle } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { HiCog6Tooth } from "react-icons/hi2";

import expertsLogo from "../../assets/experts-logo.png";
import SettingsModal from "./SettingsModal";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Flex as="header" height="100px" bg="#9333ea" width="100%">
      {isSettingsModalOpen && (
        <SettingsModal isSettingsModalOpen={isSettingsModalOpen} setIsSettingsModalOpen={setIsSettingsModalOpen} />
      )}
      {isLoginModalOpen && <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />}
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
          <Button
            colorScheme="black"
            color="white"
            variant="plain"
            onClick={() => {
              console.log("click");
              setIsLoginModalOpen(true);
            }}
          >
            <HiMiniUserCircle />
          </Button>
          <Button
            colorScheme="black"
            color="white"
            variant="plain"
            onClick={() => {
              console.log("click settings");
              setIsSettingsModalOpen(true);
            }}
          >
            <HiCog6Tooth />
          </Button>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
