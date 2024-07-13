import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Contents from "../../components/Content/Contents";
import { TbWorld } from "react-icons/tb";
import { AiOutlineSkin } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const HomePage = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(firestore, "posts"));
      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setContents(postsData);
    };
    fetchPosts();
  }, []);

  const addons = contents.filter(content => content.category === 'Addon');
  const worlds = contents.filter(content => content.category === 'World');
  const skins = contents.filter(content => content.category === 'Skin');
  const servers = contents.filter(content => content.category === 'Server');

  return (
    <Container minWidth={'full'} overflowY="auto">
      <Flex direction="column" minWidth={'full'}>
        <Flex alignItems="center" gap={2} mt={4} minWidth={'full'}>
          <IoExtensionPuzzleOutline />
          <Text>Addons</Text>
        </Flex>
        <Box overflowX="auto" minWidth={'full'} alignContent={'flex-start'}>
          <Contents contents={addons} />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <BiWorld />
          <Text>Worlds</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents contents={worlds} />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <AiOutlineSkin />
          <Text>Skins</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents contents={skins} />
        </Box>

        <Flex alignItems="center" gap={2} mt={4}>
          <TbWorld />
          <Text>Servers</Text>
        </Flex>
        <Box overflowX="auto" w="100%">
          <Contents contents={servers} />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
