import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Contents from "../../components/Content/Contents";
import { TbWorld } from "react-icons/tb";
import { AiOutlineSkin } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const HomePage = () => {
  return (
    <Container minWidth={'full'} overflowY="auto">
      <Flex direction="column" minWidth={'full'}>
        <Flex alignItems="center" gap={2}>
          <IoExtensionPuzzleOutline />
          <Text>Addons</Text>
        </Flex>
        <Box overflowX="auto" minWidth={'full'} alignContent={'flex-start'}>
          <Contents category="Addon" />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <BiWorld />
          <Text>Worlds</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents category="World" />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <AiOutlineSkin />
          <Text>Skins</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents category="Skin" />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <TbWorld />
          <Text>Servers</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents category="Server" />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
