import { Avatar, Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillDelete, AiOutlineSend } from 'react-icons/ai';
import Comment from '../../components/Comment/Comment';

const PostContent = () => {
  return (
    <>
    <Flex direction='column' w={'full'} px={2} gap={5}>
        <Flex direction={'column'}> 
        <Text>Pembukaan</Text>
        <Text>Isi</Text>
        <Text>Penutup</Text>
        <Button>Download Here</Button>
        </Flex>

        <Flex borderTop={"1px solid white"}></Flex>
        <Flex flex={1} flexDir={'column'} gap={4}>
          Comments...
        <Flex alignItems={'center'} w={'full'}>
          <Flex alignItems={'center'} gap={2} w={'full'}>
            <Avatar src='' name='OverhandBook79' size={{md:'sm', base:'xs'}}/>
            <Text fontSize={{md:"14px", base:"10px"}} fontWeight={'bold'}>OverhandBook79</Text>
            <InputGroup>
            <Input fontSize={{md:"14px", base:"10px"}} size={5} w={'full'} border={'none'} type='text' placeholder='Write a comment'/>
            <InputRightElement>
            <Box _hover={{ bg:'whiteAlpha.300', color:'blue.600'}} p={1} borderRadius={4}>
            <AiOutlineSend cursor={"pointer"} />
            </Box>
            </InputRightElement>
            </InputGroup>
          </Flex>

          <Box _hover={{ bg:'whiteAlpha.300', color:'red.600'}} borderRadius={4} p={1}>
            <AiFillDelete size='18' cursor={'pointer'}/>
          </Box>
        </Flex>
        <Divider w={"full"}/>
        <Comment avatar='' username='Jions 1080p' text='Liat nih CC201 Vintage nya. Keren gak?' createdAt='8/12/2023'/>
        <Comment avatar='' username='VX Craft' text='Mantab bro' createdAt='10/12/2023'/>
        <Comment avatar='' username='RF Craft' text='Widih keren, gimana klo kita bertiga collab?' createdAt='12/12/2023'/>
        </Flex>
    </Flex>
    </>
  );
};

export default PostContent