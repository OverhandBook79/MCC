import React from 'react';
import { Avatar, Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const Comment = ({ comment }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  const CommentSkeleton = () => {
    return (
      <Flex gap={4} w={"full"} alignItems={"center"}>
        <SkeletonCircle h={10} w='10' />
        <Flex gap={1} flexDir={"column"}>
          <Skeleton height={2} width={100} />
          <Skeleton height={2} width={50} />
        </Flex>
      </Flex>
    );
  };
  if (isLoading) return <CommentSkeleton />;
  return (
    <Box mb={4} border="1px solid #e2e8f0" borderRadius="md" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Link to={`/${userProfile.username}`}>
            <Avatar src={userProfile.profilePicURL} size={"sm"} />
          </Link>
          <Box ml={3}>
            <Text fontWeight="bold">{comment.username}</Text>
            <Text fontSize="sm">{comment.createdAt}</Text>
          </Box>
        </Flex>
        {comment.userId === currentUser.userId && (
          <Button size="xs" colorScheme="red" onClick={() => onDelete(comment.id)}>
            Delete
          </Button>
        )}
      </Flex>
      {comment.replyTo && (
        <Box mt={2} p={2} bg={bgColor} borderRadius="md">
          <Text fontWeight="bold">{comment.replyTo.username}</Text>
          <Text fontSize="sm">{comment.replyTo.text}</Text>
        </Box>
      )}
      <Text mt={2}>{comment.text}</Text>
      <Button size="xs" colorScheme="blue" mt={2} onClick={() => onReply(comment)}>
        Reply
      </Button>
    </Box>
    
  );
};

export default Comment;
