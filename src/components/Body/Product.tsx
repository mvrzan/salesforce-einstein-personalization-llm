import { Text, Box, Image, VStack } from "@chakra-ui/react";

interface ProductProps {
  image: string;
  productName: string;
  description: string;
}

const Product = ({ image, productName, description }: ProductProps) => {
  return (
    <Box
      as="button"
      border="solid"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="black"
      height="400px"
      width="300px"
      _hover={{ boxShadow: "0 0 10px 2px purple", borderColor: "purple" }}
    >
      <VStack>
        <Image src={image} alt="camera product image" height="100%" width="100%" borderRadius="8px" />
        <Text fontSize="20px" fontWeight="extrabold">
          {productName}
        </Text>
        <Text fontSize="14px" fontWeight="medium" padding="15px" textAlign="center">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default Product;
