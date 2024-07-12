import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiShare2, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Comment from '../../components/Comment/Comment';
import { firestore, storage, auth } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [user] = useAuthState(auth);
  const { isLoading, userProfile } = useGetUserProfileById(post?.createdBy);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost(postData);
        setLikes(postData.likes || []);
        setDislikes(postData.dislikes || []);
      }
    };
    fetchPost();
  }, [id]);
  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(firestore, 'posts', id, 'comments');
      const commentsSnap = await getDocs(commentsRef);
      const commentsList = commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    };
    fetchComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      await addDoc(collection(firestore, 'posts', id, 'comments'), {
        text: newComment,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        userName: user.displayName,
        userAvatar: user.photoURL,
      });
      setNewComment('');
      const commentsSnap = await getDocs(collection(firestore, 'posts', id, 'comments'));
      setComments(commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const handleLike = async () => {
    if (user) {
      const postRef = doc(firestore, 'posts', id);
      let updatedLikes = [...likes];
      let updatedDislikes = [...dislikes];

      if (likes.includes(user.uid)) {
        updatedLikes = updatedLikes.filter(uid => uid !== user.uid);
      } else {
        updatedLikes.push(user.uid);
        updatedDislikes = updatedDislikes.filter(uid => uid !== user.uid);
      }

      setLikes(updatedLikes);
      setDislikes(updatedDislikes);

      await updateDoc(postRef, { likes: updatedLikes, dislikes: updatedDislikes });
    }
  };

  const handleDislike = async () => {
    if (user) {
      const postRef = doc(firestore, 'posts', id);
      let updatedLikes = [...likes];
      let updatedDislikes = [...dislikes];

      if (dislikes.includes(user.uid)) {
        updatedDislikes = updatedDislikes.filter(uid => uid !== user.uid);
      } else {
        updatedDislikes.push(user.uid);
        updatedLikes = updatedLikes.filter(uid => uid !== user.uid);
      }

      setLikes(updatedLikes);
      setDislikes(updatedDislikes);

      await updateDoc(postRef, { likes: updatedLikes, dislikes: updatedDislikes });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      // Fallback sharing
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard');
    }
  };
  if (isLoading) {
    return <PageLayoutSpinner />;
  }

  if (!post) {
    return <>
      Sorry but we can't found your post
    </>;
  }
  return (
    <Box p={5}>
      <Flex direction="column" gap={5}>
        <Image src={post.thumbnail} alt={post.title} maxH="400px" borderRadius="md" />
        <Text fontSize="3xl">{post.title}</Text>
        <Link to={`/${userProfile?.username}`}>
          <Flex gap={1}>
            Created by: <Text color={'blue.300'}>@{userProfile?.username}</Text>
          </Flex>
        </Link>
        <Text>{post.description}</Text>
        <Text>{post.features}</Text>
        <Text>{post.specification}</Text>
        <Divider />
        <Flex gap={4} align="center">
          <Button onClick={handleLike} colorScheme={likes.includes(user?.uid) ? 'blue' : 'gray'} gap={1}>
            <FiThumbsUp /> {likes.length}
          </Button>
          <Button onClick={handleDislike} colorScheme={dislikes.includes(user?.uid) ? 'red' : 'gray'} gap={1}>
            <FiThumbsDown /> {dislikes.length}
          </Button>
          <Button onClick={handleShare} colorScheme="teal" gap={1}>
            <FiShare2 /> Share
          </Button>
        </Flex>
        <Divider />
        <Box mt={1} >
          <Text fontSize="xl" fontWeight="bold">Comments</Text>
          {user && (
            <Flex align={'center'} gap={1} p={4}>
              <Avatar size="sm" src={userProfile?.profilePicURL} />
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={handleCommentChange}
                w={'full'}
              />
              <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                <AiOutlineSend />
              </Button>
            </Flex>
          )}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={id} />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default PostPage;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl' />
    </Flex>
  );
};

