import { Button, Flex } from '@chakra-ui/react'
import { VStack } from "@chakra-ui/react";
import Contents from "../../components/Content/Contents";
import { TbWorld } from "react-icons/tb";
import { AiOutlineSkin } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const HomePage = () => {
  
  return ( <>
    <Flex>Selamat datang diberanda</Flex>
    <VStack gap={1} overflowY={"auto"}>
        <Contents categoryicon={<IoExtensionPuzzleOutline />} category={"Addons"}/>
        <Contents categoryicon={<BiWorld />} category={"Worlds"}/>
        <Contents categoryicon={<AiOutlineSkin />} category={"Skins"}/>
        <Contents categoryicon={<TbWorld />} category={"Server"}/>
      </VStack>
    <Button>Test</Button>
  </>
  )
}

export default HomePage