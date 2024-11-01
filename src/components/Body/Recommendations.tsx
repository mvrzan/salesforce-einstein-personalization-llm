import { HStack, Text, Box, Image, VStack } from "@chakra-ui/react";

import cameraImage from "../../assets/camera.jpg";
import headphoneImage from "../../assets/headphones.jpg";
import droneImage from "../../assets/drone.jpg";
import smartwatchImage from "../../assets/smart-watch.jpg";

const Recommendations = () => {
  return (
    <>
      <VStack align="start" paddingLeft="100px" paddingBottom="40px">
        <Text fontSize="3xl" fontWeight="extrabold" color="#9333ea" textAlign="start">
          Product recommendations
        </Text>
      </VStack>
      <VStack marginBottom="40px">
        <HStack gap="10">
          <Box border="solid" borderRadius="8px" borderWidth="1px" borderColor="black" height="430px" width="300px">
            <VStack>
              <Image src={cameraImage} alt="camera product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Camera
              </Text>
              <Text fontSize="15px" fontWeight="medium" padding="15px" textAlign="center">
                Capture life's moments in stunning detail with our state-of-the-art digital camera. Featuring
                high-resolution imaging and advanced autofocus technology, this camera ensures every shot is
                picture-perfect.
              </Text>
            </VStack>
          </Box>
          <Box border="solid" borderRadius="8px" borderWidth="1px" borderColor="black" height="430px" width="300px">
            <VStack>
              <Image src={headphoneImage} alt="headphone product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Headphones
              </Text>
              <Text fontSize="15px" fontWeight="medium" padding="15px" textAlign="center">
                Experience unparalleled sound quality with our premium headphones. Designed for comfort and equipped
                with noise-canceling technology, they deliver an immersive audio experience for music lovers and
                professionals alike.
              </Text>
            </VStack>
          </Box>
          <Box border="solid" borderRadius="10px" borderWidth="1px" borderColor="black" height="430px" width="300px">
            <VStack>
              <Image src={droneImage} alt="drone product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Drone
              </Text>
              <Text fontSize="15px" fontWeight="medium" padding="15px" textAlign="center">
                Take your photography and videography to new heights with our cutting-edge drone. With its
                high-definition camera and intuitive controls, capturing breathtaking aerial footage has never been
                easier.
              </Text>
            </VStack>
          </Box>
          <Box border="solid" borderRadius="8px" borderWidth="1px" borderColor="black" height="430px" width="300px">
            <VStack>
              <Image
                src={smartwatchImage}
                alt="smartwatch product image"
                height="200px"
                width="100%"
                borderRadius="8px"
              />
              <Text fontSize="20px" fontWeight="extrabold" padding="15px" textAlign="center">
                Smartwatch
              </Text>
              <Text fontSize="15px" fontWeight="medium" padding="15px" textAlign="center">
                Stay connected and track your fitness goals with our sleek and versatile smartwatch. Featuring a vibrant
                display and a range of health monitoring features, it seamlessly integrates into your daily routine.
              </Text>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </>
  );
};

export default Recommendations;
