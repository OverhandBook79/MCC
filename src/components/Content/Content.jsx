import { Box, VStack, useColorModeValue, Flex, Skeleton, SkeletonCircle, Image, Avatar, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

const Content = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { isLoading, userProfile } = useGetUserProfileById(post?.createdBy);
  const handlePostClick = () => {
    navigate(`/post/${postId}`);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost(postData);
      }
    };
    fetchPost();
  }, [id]);
  
  if (isLoading) {
    <Box
      maxWidth="360px"
      minWidth="360px"
      minHeight="270px"
      bgColor={bgColor}
      maxHeight="270px"
      borderRadius="md"
      overflow="hidden"
      padding={2}
      alignItems={'center'}
      justifyContent={'left'}
    >
      <VStack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={'left'}
          minW="340px"
          minH="180px"
          maxW="340px"
          maxH="180px"
          borderRadius={'md'}
        >
          <Skeleton
            minW="340px"
            minH="180px"
            maxW="340px"
            maxH="180px"
            borderRadius={'md'}
          />
        </Box>
        <Flex alignItems={'center'} columnGap={4} py={2} justifyContent={'left'} w={'340px'}>
          <SkeletonCircle size='12' />
          <VStack align="start" spacing={2} gap={3}>
            <Skeleton w={"274px"} h={4} />
            <Skeleton w={"200px"} h={4} />
          </VStack>
        </Flex>
      </VStack>
    </Box>
  }
  if (!post) {
    return <>
      <Box
        bgColor={bgColor}
        borderRadius="md"
        overflow="hidden"
        padding={2}
        alignItems={'center'}
        justifyContent={'left'}
      >
        <Image
          borderRadius={'md'}
          src='/bin.png'
          alt='Thumbnail'
        />
      </Box>
    </>
  }
  return (
    <Box
      maxWidth="360px"
      minWidth="360px"
      minHeight="270px"
      bgColor={bgColor}
      maxHeight="270px"
      borderRadius="md"
      overflow="hidden"
      padding={2}
      alignItems={'center'}
      justifyContent={'left'}
      onClick={handlePostClick}
      cursor="pointer"
    >
      <VStack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={'left'}
          minW="340px"
          minH="180px"
          maxW="340px"
          maxH="180px"
          borderRadius={'md'}
        >
          <Image
            minW="340px"
            minH="180px"
            maxW="340px"
            maxH="180px"
            borderRadius={'md'}
            src={post.thumbnail}
            alt='Thumbnail'
          />
        </Box>
        <Flex alignItems={'center'} columnGap={4} py={2} justifyContent={'left'} w={'340px'}>
          <Link to={`/${userProfile?.username}`}>
            <Avatar size="sm" src={post.userAvatar} />
          </Link>
          <VStack align="start" spacing={2} gap={3}>
            <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
            <Text fontSize="sm" color="gray.500">Uploaded at: {post.createdAt}</Text>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Content;