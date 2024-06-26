import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const PostHeader = ({username, date, title, img }) => {
  return (
    <>
    <Flex p={2} gap={2}>
        <Flex w={'full'} direction={'column'} justifyContent={"center"}>
        <Text as={"span"} fontWeight={"bold"} fontSize={20}>{title}</Text>

        <Flex alignItems={"center"} justifyContent={"center"}>
            <Image aspectRatio={16/9} maxH={'450px'} src={img} borderRadius={10}/>
        </Flex>
        
        <Text as={"span"} fontWeight={"bold"}> Created By {username}</Text>
        <Text as={"span"} fontSize={11}>Created at {date}</Text>
        </Flex>
    </Flex>
    </>
  )
}

export default PostHeader