import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import Comment from '../../components/Comment/Comment';
import { firestore, storage, auth } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

const PostPage = () => {
  const { id } = useParams();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser] = useAuthState(auth);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(firestore, 'contents', id));
      if (postDoc.exists()) {
        setPost(postDoc.data());
      }
    };

    const fetchComments = async () => {
      const commentsSnapshot = await getDocs(collection(firestore, 'contents', id, 'comments'));
      const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleDownload = async () => {
    try {
      const fileRef = ref(storage, `posts/${id}/${post.file}.zip`);
      const url = await getDownloadURL(fileRef);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${post.title}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newCommentText.trim() || !currentUser) return;

    const newComment = {
      userId: currentUser.uid,
      avatar: currentUser.photoURL || '',
      username: currentUser.displayName || 'Anonymous',
      text: newCommentText,
      createdAt: serverTimestamp(),
      replyTo: replyTo ? { username: replyTo.username, text: replyTo.text } : null,
    };

    try {
      const commentDocRef = await addDoc(collection(firestore, 'contents', id, 'comments'), newComment);
      setComments([...comments, { id: commentDocRef.id, ...newComment }]);
      setNewCommentText('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(firestore, 'contents', id, 'comments', commentId));
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReply = (comment) => {
    setReplyTo(comment);
  };

  return (
    <Flex direction='column' w='full' px={1} mt={-2} gap={5}>
      <Flex p={2} gap={2}>
        <Flex w='full' direction='column' justifyContent={{base:'left' , md: 'center' }} gap={1}>
          <Text fontWeight='bold' fontSize={20}>{post.title}</Text>
          <Flex alignItems='center' justifyContent={'left'}>
            <Image mixW='full' maxW='full' src={post.thumbnail} borderRadius={10} />
          </Flex>
          <Text as='span' fontWeight='bold'> Created By {post.username}</Text>
          <Text as='span' fontSize={11}>Created at {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</Text>
        </Flex>
      </Flex>

      <Flex direction='column'>
        <Text>{post.description}</Text>
        <Text>{post.features}</Text>
        <Text>{post.specification}</Text>
        <Button onClick={handleDownload}>Download Here</Button>
      </Flex>

      <Divider my={4} />

      <Flex direction='column' gap={4}>
        <Text fontSize='xl'>Comments</Text>
        {post.comments.map((comment) => (
										<Comment key={comment.id} comment={comment} />
									))}

        {replyTo && (
          <Box mt={4} p={2} bg={bgColor} borderRadius="md">
            <Text fontWeight="bold">Replying to {replyTo.username}</Text>
            <Text fontSize="sm">{replyTo.text}</Text>
          </Box>
        )}

        <Flex alignItems='center' w='full'>
          <Flex alignItems='center' gap={2} w='full'>
            <Avatar src={currentUser?.photoURL} name={currentUser?.displayName || 'Anonymous'} size={{ md: 'sm', base: 'xs' }} />
            <InputGroup>
              <Input
                fontSize={{ md: '14px', base: '10px' }}
                size={5}
                w='full'
                border='none'
                type='text'
                placeholder='Write a comment'
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              <InputRightElement>
                <Box
                  _hover={{ bg: 'whiteAlpha.300', color: 'blue.600' }}
                  p={1}
                  borderRadius={4}
                  onClick={handleCommentSubmit}
                >
                  <AiOutlineSend cursor='pointer' />
                </Box>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostPage;
