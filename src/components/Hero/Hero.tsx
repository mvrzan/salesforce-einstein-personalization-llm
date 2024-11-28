import { Image, Flex } from "@chakra-ui/react";
import useBearStore from "@/hooks/useBearStore";

import welcomeImage from "../../assets/welcome.png";

const Hero = () => {
  const banner = useBearStore((state) => state.bannerImage);

  return (
    <Flex align="center" justify="center">
      <Image src={banner ? banner : welcomeImage} alt="banner image" height="300px" width="100%" />
    </Flex>
  );
};

export default Hero;
