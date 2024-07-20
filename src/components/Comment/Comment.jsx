import React from 'react';
import { Avatar, Box, Flex, Text, Button } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { FiTrash2 } from 'react-icons/fi';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../utils/timeAgo';

const Comment = ({ comment, postId }) => {
  const [user] = useAuthState(auth);
  const [comment, setPost] = useState(null);
  const { isLoading, userProfilePost } = useGetUserProfileById(comment?.createdBy);

  const handleDeleteComment = async () => {
    if (comment.createdBy === user.uid) {
      await deleteDoc(doc(firestore, 'posts', postId, 'comments', comment.id));
    }
  };

  return (
    <Flex p={4} borderRadius='md' boxShadow='md'>
      <Avatar size="sm" src={userProfilePost?.userAvatar} />
      <Box>
        <Flex align='center' mb={2}>
          <Text fontWeight='bold' mr={2}>
            {userProfilePost?.userName}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            {timeAgo(comment.createdAt?.toDate()).toLocaleString()}
            
          </Text>
        </Flex>
        <Text mb={2}>{comment.text}</Text>
        {user?.uid === comment.createdBy && (
          <Button onClick={handleDeleteComment} colorScheme='red' size='xs' leftIcon={<FiTrash2 />}>
            Delete
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Comment;
