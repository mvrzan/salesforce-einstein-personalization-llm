import { Image, Flex } from "@chakra-ui/react";

import welcomeImage from "../../assets/welcome.png";

const Hero = () => {
  return (
    <Flex align="center" justify="center">
      <Image src={welcomeImage} alt="welcome banner image" height="300px" width="100%" />
    </Flex>
  );
};

export default Hero;
