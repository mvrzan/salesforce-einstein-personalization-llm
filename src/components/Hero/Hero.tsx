import { Image, Flex } from "@chakra-ui/react";

import heroImage from "../../assets/banner3.jpg";

const Hero = () => {
  return (
    <Flex align="center" justify="center">
      <Image src={heroImage} alt="hero image" height="300px" width="100%" />
    </Flex>
  );
};

export default Hero;
