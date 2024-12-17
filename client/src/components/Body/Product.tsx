import { Text, Box, Image, VStack } from "@chakra-ui/react";
import useBearStore from "@/hooks/useBearStore";

interface ProductProps {
  image: string;
  productName: string;
  description: string;
}

const Product = ({ image, productName, description }: ProductProps) => {
  const theme = useBearStore((state) => state.theme);

  const themeSelector = () => {
    const themeColors: { [key: string]: string } = {
      dark: "purple",
      teal: "teal",
      gray: "gray",
      green: "green",
    };
    return themeColors[theme] || "defaultColor";
  };

  return (
    <VStack>
      <Box
        as="button"
        border="solid"
        borderRadius="10px"
        borderWidth="1px"
        borderColor={themeSelector()}
        height="400px"
        width="300px"
        _hover={{ boxShadow: `0 0 10px 2px ${themeSelector()}`, borderColor: `${themeSelector()}` }}
      >
        <VStack height="100%" justifyContent="flex-start">
          <Image src={image} alt="camera product image" height="200px" width="100%" borderRadius="8px" />
          <Text fontSize="24px" fontWeight="extrabold" color={themeSelector()}>
            {productName}
          </Text>
          <Text fontSize="14px" fontWeight="medium" padding="15px" textAlign="center" color={themeSelector()}>
            {description}
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Product;
