import { Box, VStack, useColorModeValue, Flex, Skeleton, SkeletonCircle, Image, Avatar, Text } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { format } from 'date-fns';

const Content = ({ post }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { isLoading, userProfile } = useGetUserProfileById(post?.createdBy);
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  const createdAt = post.createdAt?.toDate(); // Convert Firestore Timestamp to Date

  if (isLoading) {
    return (
      <Box
        maxWidth="360px"
        minWidth="360px"
        minHeight="270px"
        maxHeight="270px"
        bgColor={bgColor}
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
    );
  }

  if (!post) {
    return (
      <Box
        maxWidth="360px"
        minWidth="360px"
        minHeight="270px"
        maxHeight="270px"
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
          maxWidth="350px"
          minWidth="350px"
          minHeight="260px"
          maxHeight="260px"
        />
      </Box>
    );
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
            <Avatar size="sm" src={userProfile?.profilePicURL} />
          </Link>
          <VStack align="start" spacing={2} gap={3}>
            <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
            {createdAt && <Text fontSize="sm" color="gray.500">{format(createdAt, 'PPpp')}</Text>}
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Content;
