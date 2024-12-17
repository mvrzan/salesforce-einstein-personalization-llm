import { useEffect, useState } from "react";
import useBearStore from "@/hooks/useBearStore";
import { keyframes } from "@emotion/react";

import { HStack, Text, Box, Image, VStack, Spacer, Center } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

import Product from "./Product";
import useSalesforceInteractions from "@/hooks/useSalesforceInteractions";
import { ProductType } from "@/utils/types";
import cameraImage from "../../assets/camera.jpg";
import headphoneImage from "../../assets/headphones.jpg";
import droneImage from "../../assets/drone.jpg";
import smartwatchImage from "../../assets/smart-watch.jpg";

const borderAnimation = keyframes`
  0% {
    border-width: 1px;
    border-color: transparent;
    box-shadow: none;
  }
  25% {
    border-width: 4px;
    border-color: purple;
    box-shadow: 0 0 10px 2px purple;
  }
  50% {
    border-width: 1px;
    border-color: transparent;
    box-shadow: none;
  }
  75% {
    border-width: 4px;
    border-color: purple;
    box-shadow: 0 0 10px 2px purple;
  }
  100% {
    border-width: 1px;
    border-color: transparent;
    box-shadow: none;
  }
`;

const Recommendations = () => {
  const { viewProduct, personalizationProductRecommendations } = useSalesforceInteractions();
  const [recommendedProducts, setRecommendedProducts] = useState<ProductType[]>([]);
  const [resetRecommendationsVisible, setResetRecommendationsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const epRecommendedProducts = useBearStore((state) => state.epRecommendedProducts);
  const updateRecommendedProducts = useBearStore((state) => state.updateRecommendedProducts);

  useEffect(() => {
    if (epRecommendedProducts.length === 0) return;

    const productCategory = epRecommendedProducts[0]?.ssot__PrimaryProductCategory__c;
    setSelectedCategory(productCategory);
    setResetRecommendationsVisible(true);
  }, [epRecommendedProducts]);

  const productClickedHandler = async (id: number, productName: string, productDescription: string) => {
    viewProduct(id, productName, productDescription);

    const products = await personalizationProductRecommendations(["recsEP1"], id.toString());
    setRecommendedProducts(products);
    setResetRecommendationsVisible(true);
    setSelectedCategory(productName);

    return toaster.create({
      title: `${productName} info sent to Data Cloud!`,
      type: "success",
    });
  };

  const resetRecommendations = () => {
    setResetRecommendationsVisible(false);
    setRecommendedProducts([]);
    updateRecommendedProducts([]);
    setSelectedCategory("");
  };

  return (
    <>
      <Toaster />
      <HStack align="start" paddingX="100px" paddingBottom="40px">
        <Text fontSize="3xl" fontWeight="extrabold" color="#9333ea" textAlign="start">
          Product Categories
        </Text>
        <Spacer />
        {resetRecommendationsVisible && (
          <Button colorPalette="purple" onClick={resetRecommendations}>
            Reset recommendations
          </Button>
        )}
      </HStack>
      <VStack marginBottom="40px">
        <HStack gap="10">
          <Box
            as="button"
            border="solid"
            borderRadius="8px"
            borderWidth="1px"
            height="400px"
            width="300px"
            _hover={{ boxShadow: "0 0 10px 2px purple", borderColor: "purple" }}
            onClick={() => {
              productClickedHandler(1001, "Camera", "A really good camera");
            }}
            animation={selectedCategory === "Camera" ? `${borderAnimation} 2s infinite` : "none"}
          >
            <VStack>
              <Image src={cameraImage} alt="camera product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Camera
              </Text>
              <Text fontSize="14px" fontWeight="medium" padding="15px" textAlign="center">
                Capture life's moments in stunning detail with our state-of-the-art digital camera. Featuring
                high-resolution imaging and advanced autofocus technology, this camera ensures every shot is
                picture-perfect.
              </Text>
            </VStack>
          </Box>
          <Box
            as="button"
            border="solid"
            borderRadius="8px"
            borderWidth="1px"
            height="400px"
            width="300px"
            _hover={{ boxShadow: "0 0 10px 2px purple", borderColor: "purple" }}
            onClick={() => productClickedHandler(1002, "Headphones", "Really good headphones")}
            animation={selectedCategory === "Headphones" ? `${borderAnimation} 2s infinite` : "none"}
            paddingBottom="30px"
          >
            <VStack>
              <Image src={headphoneImage} alt="headphone product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Headphones
              </Text>
              <Text fontSize="14px" fontWeight="medium" textAlign="center">
                Experience unparalleled sound quality with our premium headphones. Designed for comfort and equipped
                with noise-canceling technology, they deliver an immersive audio experience for music lovers and
                professionals alike.
              </Text>
            </VStack>
          </Box>
          <Box
            as="button"
            border="solid"
            borderRadius="11px"
            borderWidth="1px"
            height="400px"
            width="300px"
            paddingBottom="50px"
            _hover={{ boxShadow: "0 0 10px 2px purple", borderColor: "purple" }}
            onClick={() => productClickedHandler(1003, "Drone", "Top of the line drone")}
            animation={selectedCategory === "Drone" ? `${borderAnimation} 2s infinite` : "none"}
          >
            <VStack>
              <Image src={droneImage} alt="drone product image" height="100%" width="100%" borderRadius="8px" />
              <Text fontSize="20px" fontWeight="extrabold">
                Drone
              </Text>
              <Text fontSize="14px" fontWeight="medium" textAlign="center">
                Take your photography and videography to new heights with our cutting-edge drone. With its
                high-definition camera and intuitive controls, capturing breathtaking aerial footage has never been
                easier.
              </Text>
            </VStack>
          </Box>
          <Box
            as="button"
            border="solid"
            borderRadius="8px"
            borderWidth="1px"
            height="400px"
            width="300px"
            _hover={{ boxShadow: "0 0 10px 2px purple", borderColor: "purple" }}
            onClick={() => productClickedHandler(1004, "Smartwatch", "Best smartwatch out there")}
            animation={selectedCategory === "Smartwatch" ? `${borderAnimation} 2s infinite` : "none"}
          >
            <VStack>
              <Image
                src={smartwatchImage}
                alt="smartwatch product image"
                height="200px"
                width="100%"
                borderRadius="8px"
              />
              <Text fontSize="20px" fontWeight="extrabold" textAlign="center">
                Smartwatch
              </Text>
              <Text fontSize="14px" fontWeight="medium" padding="15px" textAlign="center">
                Stay connected and track your fitness goals with our sleek and versatile smartwatch. Featuring a vibrant
                display and a range of health monitoring features, it seamlessly integrates into your daily routine.
              </Text>
            </VStack>
          </Box>
        </HStack>
      </VStack>
      <Center>
        <HStack gap="10" marginBottom="40px">
          {recommendedProducts?.map((product) => {
            return (
              <Product
                key={product.ssot__Id__c}
                image={product.ImageURL__c}
                productName={product.ssot__Name__c}
                description="This is an example of Einstein Personalization. This item was recommended based on the interest (click) on the above product!"
              />
            );
          })}
          {epRecommendedProducts?.map((product) => {
            return (
              <Product
                key={product.ssot__Id__c}
                image={product.ImageURL__c}
                productName={product.ssot__Name__c}
                description="This is an example of Einstein Personalization. This item was recommended based on the interest (click) on the above product!"
              />
            );
          })}
        </HStack>
      </Center>
    </>
  );
};

export default Recommendations;
