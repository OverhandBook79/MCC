import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { AiFillDelete, AiOutlineSend } from 'react-icons/ai';
import Comment from '../../components/Comment/Comment';

const PostPage = () => {
  const { id } = useParams();
  const contents = JSON.parse(localStorage.getItem('contents')) || [];
  const post = contents.find(content => content.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Flex direction='column' w={'full'} px={2} gap={5}>
      <Flex p={2} gap={2}>
        <Flex w={'full'} direction={'column'} justifyContent={"center"}>
          <Text as={"span"} fontWeight={"bold"} fontSize={20}>{post.title}</Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image aspectRatio={16/9} maxH={'450px'} src={post.thumbnail} borderRadius={10}/>
          </Flex>
          <Text as={"span"} fontWeight={"bold"}> Created By {post.username}</Text>
          <Text as={"span"} fontSize={11}>Created at {post.date}</Text>
        </Flex>
      </Flex>

      <Flex direction={'column'}>
        <Text>{post.description}</Text>
        <Text>{post.features}</Text>
        <Text>{post.specification}</Text>
        <Button>Download Here</Button>
      </Flex>

      <Flex borderTop={"1px solid white"}></Flex>
      <Flex flex={1} flexDir={'column'} gap={4}>
        Comments...
        <Flex alignItems={'center'} w={'full'}>
          <Flex alignItems={'center'} gap={2} w={'full'}>
            <Avatar src='' name='OverhandBook79' size={{ md: 'sm', base: 'xs' }} />
            <Text fontSize={{ md: "14px", base: "10px" }} fontWeight={'bold'}>OverhandBook79</Text>
            <InputGroup>
              <Input fontSize={{ md: "14px", base: "10px" }} size={5} w={'full'} border={'none'} type='text' placeholder='Write a comment' />
              <InputRightElement>
                <Box _hover={{ bg: 'whiteAlpha.300', color: 'blue.600' }} p={1} borderRadius={4}>
                  <AiOutlineSend cursor={"pointer"} />
                </Box>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Box _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }} borderRadius={4} p={1}>
            <AiFillDelete size='18' cursor={'pointer'} />
          </Box>
        </Flex>
        <Divider w={"full"} />
        {/* Example comments, replace with dynamic data */}
        <Comment avatar='' username='Jions 1080p' text='Liat nih CC201 Vintage nya. Keren gak?' createdAt='8/12/2023' />
        <Comment avatar='' username='VX Craft' text='Mantab bro' createdAt='10/12/2023' />
        <Comment avatar='' username='RF Craft' text='Widih keren, gimana klo kita bertiga collab?' createdAt='12/12/2023' />
      </Flex>
    </Flex>
  );
};

export default PostPage;
