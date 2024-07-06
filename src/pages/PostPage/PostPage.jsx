import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import Comment from '../../components/Comment/Comment';

const PostPage = () => {
  const { id } = useParams();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem(`comments-${id}`)) || []);
  const [currentUser, setCurrentUser] = useState({ userId: '', username: 'Anonymous', avatar: '' });
  const [newCommentText, setNewCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setCurrentUser({
        userId: storedUser.userId,
        username: storedUser.username,
        avatar: storedUser.avatar,
      });
    } else {
      setCurrentUser({ userId: '', username: 'Anonymous', avatar: '' });
    }
  }, []);

  const contents = JSON.parse(localStorage.getItem('contents')) || [];
  const post = contents.find(content => content.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleDownload = () => {
    const blob = new Blob([post.compressedFile], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.title}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCommentSubmit = () => {
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      userId: currentUser.userId,
      avatar: currentUser.avatar,
      username: currentUser.username,
      text: newCommentText,
      createdAt: new Date().toLocaleDateString(),
      replyTo: replyTo ? { username: replyTo.username, text: replyTo.text } : null,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewCommentText('');
    setReplyTo(null);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
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
          <Text as='span' fontSize={11}>Created at {post.date}</Text>
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
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onDelete={handleDeleteComment}
            onReply={handleReply}
          />
        ))}

        {replyTo && (
          <Box mt={4} p={2} bg={bgColor} borderRadius="md">
            <Text fontWeight="bold">Replying to {replyTo.username}</Text>
            <Text fontSize="sm">{replyTo.text}</Text>
          </Box>
        )}

        <Flex alignItems='center' w='full'>
          <Flex alignItems='center' gap={2} w='full'>
            <Avatar src={currentUser.avatar} name={currentUser.username} size={{ md: 'sm', base: 'xs' }} />
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
