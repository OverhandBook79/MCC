import { Flex,  Text, VStack } from "@chakra-ui/react";
import Content from "./Content";

const Contents = ({categoryicon, category}) => {
  return (
    <VStack>
      <Flex justifyContent={"left"} w={"full"}> 
        <Flex align={"center"} gap={2} >
          {categoryicon}
          {category}
        </Flex>
      </Flex>
      <Flex 
        gap={4}
        overflowX="auto"
      >
        <Content img='/pic1.png' avatar='' title='CC201' date='kemaren' username='Jions 1080HD'/>
        <Content img='/pic2.png' avatar='' title='CC205' date='hari ini' username='VX Craft'/>
        <Content img='/pic4.png' avatar='' title='Papan Stasiun' date='3 bulan lalu' username='OverhandBook79'/>
        <Content img='/pic3.png' avatar='' title='CC206' date='2 tahun lalu' username='RF Craft'/>
      </Flex>
    </VStack>
  );
};

export default Contents;
