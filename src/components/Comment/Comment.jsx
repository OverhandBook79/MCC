import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Comment = ({avatar, username, createdAt, text}) => {
  return (
    <>
    <Flex justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
        <Avatar size={{md:'sm', base:'xs'}} src={avatar} name={username}/>
        <Text fontSize={{md:"14px", base:"10px"}} fontWeight={'bold'}>{username}</Text>
        <Text fontSize={{md:"14px", base:"10px"}}>: {text}</Text>
        </Flex>

        <Flex gap={2} alignItems={'center'}>
        <Text fontSize={{md:"12px", base:"8px"}} color={"gray.400"}>{createdAt}</Text>
        <Text fontSize={{md:"13px", base:"9px"}} cursor='pointer' color='blue.500'>Reply</Text>
        </Flex>
    </Flex>
    </>
  )
}

export default Comment