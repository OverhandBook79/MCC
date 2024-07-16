import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Flex, Image, Input, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiShare2, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Comment from '../../components/Comment/Comment';
import { firestore, storage, auth } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { DownloadIcon } from '@chakra-ui/icons';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const authUser = useAuthStore((state) => state.user);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [user] = useAuthState(auth);
  const { isLoading, userProfilePost } = useGetUserProfileById(post?.createdBy);
	const { userProfile } = useUserProfileStore();

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

  const handleDownload = async () => {
    try {
      const fileRef = ref(storage, `posts/${id}/${post.files}`);
      const url = await getDownloadURL(fileRef);
      const a = document.createElement('a');
      a.href = url;
      a.download = post.files;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
      let updatedLikes = Array.isArray(likes) ? [...likes] : [];
      let updatedDislikes = Array.isArray(dislikes) ? [...dislikes] : [];

      if (updatedLikes.includes(user.uid)) {
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
      let updatedLikes = Array.isArray(likes) ? [...likes] : [];
      let updatedDislikes = Array.isArray(dislikes) ? [...dislikes] : [];

      if (updatedDislikes.includes(user.uid)) {
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
    return (
      <Box p={5}>
        <Text fontSize="xl">Sorry, but we can't find your post.</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Flex direction="column" gap={5}>
        <Image src={post.thumbnail} alt={post.title} maxH="400px" borderRadius="md" />
        <Text fontSize="3xl">{post.title}</Text>
        <Link to={`/${userProfilePost?.username}`}>
          <Flex gap={1}>
            Created by: <Text color={'blue.300'}>@{userProfilePost?.username}</Text>
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
          <Button onClick={handleDownload} colorScheme="teal" gap={1}>
            <DownloadIcon /> Download Here...
          </Button>
        </Flex>
        <Divider />
        <Box mt={1}>
          <Text fontSize="xl" fontWeight="bold">Comments</Text>
          {user && (
            <Flex align={'center'} gap={1} p={4}>
              <Avatar size="sm" src={authUser?.profilePicURL} />
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
