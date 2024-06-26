import { Box, Flex } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import Contents from "../../components/Content/Contents";

const ServersPage = () => {
    return (
        <Flex direction="column" minHeight="100vh">
          <Flex direction="column" flex={1}>
          {/* pembelah */}
          <Flex direction="column" p={2}>
          <Flex gap={2}>
          <Flex display={{md:"block", base:"none"}}>
            <TopCreators />
          </Flex>
          <VStack gap={1}>
            <Contents categoryicon={null} category={"Populer"}/>
            <Contents categoryicon={null} category={"Newest"}/>
            <Contents categoryicon={null} category={"Oldest"}/>
            <Contents categoryicon={null} category={"All"}/>
          </VStack> 
          </Flex>
          </Flex>
          {/* pembelah */}
          </Flex>
          <Box position="sticky" bottom={0} zIndex={1}>
          </Box>
        </Flex>
      );
    };
    
export default ServersPage;
