import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import Contents from "../../components/Content/Contents";

const WorldsPage = () => {
    return (
    <Container maxW="container.xl" overflowY="auto">
      <Flex>
        <Box flex="1" overflowX="auto">
          <SimpleGrid minChildWidth="250px" spacing={4} display="flex" flexDirection="column">
            <Box overflowX="auto">
              <Contents categoryicon={''} category={"Populer"} />
            </Box>
            <Box overflowX="auto">
              <Contents categoryicon={''} category={"Newest"} />
            </Box>
            <Box overflowX="auto">
              <Contents categoryicon={''} category={"Oldest"} />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
      );
    };
    
export default WorldsPage;
