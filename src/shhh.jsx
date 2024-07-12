// import { Button, Flex, Input, Text, VStack, Tag, TagLabel, HStack, Image } from '@chakra-ui/react';
// import React, { useState, useRef } from 'react';
// import { TbDragDrop2 } from 'react-icons/tb';
// import { useNavigate } from 'react-router-dom';
// import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { firestore, storage } from '../../firebase/firebase';
// import useAuthStore from '../../store/authStore';

// const CreationForm = () => {
// 	const authUser = useAuthStore((state) => state.user);
//   const navigate = useNavigate();
//   const inputRef = useRef();
//   const [inputs, setInputs] = useState({
//     title: '',
//     category: '',
//     description: '',
//     features: '',
//     specification: '',
//     thumbnail: '',
//     thumbnailFile: null,
//     files: [],
//     likes: [],
//     comments: [],
//     createdAt: Date.now(),
//     createdBy: authUser.uid,
//   });
//   const [error, setError] = useState('');
//   const [thumbnailPreview, setThumbnailPreview] = useState('');

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.size <= 2048); // 2KB = 2048 bytes
//     if (validFiles.length !== files.length) {
//       setError('Some files are larger than 2KB and were not added.');
//     } else {
//       setError('');
//     }
//     setInputs({ ...inputs, files: validFiles });
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setInputs({ ...inputs, thumbnailFile: file });
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setThumbnailPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = Array.from(event.dataTransfer.files);
//     const validFiles = files.filter(file => file.size <= 2048); // 2KB = 2048 bytes
//     if (validFiles.length !== files.length) {
//       setError('Some files are larger than 2KB and were not added.');
//     } else {
//       setError('');
//     }
//     setInputs({ ...inputs, files: validFiles });
//   };

//   const handleUpload = async () => {
//     if (!authUser) {
//       setError('You need to be logged in to upload a post.');
//       return;
//     }

//     setError('');

//     try {
//       // Upload thumbnail
//       let thumbnailURL = '';
//       if (inputs.thumbnailFile) {
//         const thumbnailRef = ref(storage, `thumbnails/${inputs.thumbnailFile.name}`);
//         await uploadBytes(thumbnailRef, inputs.thumbnailFile);
//         thumbnailURL = await getDownloadURL(thumbnailRef);
//       }

//       // Create a new document in Firestore and get its ID
//       const newContent = {
//         title: inputs.title,
//         category: inputs.category,
//         description: inputs.description,
//         features: inputs.features,
//         specification: inputs.specification,
//         thumbnail: thumbnailURL,
//         files: [],
//         likes: [],
//         comments: [],
//         createdAt: serverTimestamp(),
//         createdBy: authUser.uid,
//       };

//       const docRef = await addDoc(collection(firestore, 'contents'), newContent);
//       const postId = docRef.id;

//       // Upload files
//       const fileUrls = [];
//       for (const file of inputs.files) {
//         const fileRef = ref(storage, `posts/${postId}/${file.name}`);
//         await uploadBytes(fileRef, file);
//         const fileUrl = await getDownloadURL(fileRef);
//         fileUrls.push(fileUrl);
//       }

//       // Update the document with the file URLs
//       await updateDoc(doc(firestore, 'contents', postId), { files: fileUrls });

//       navigate(`/post/${postId}`);
//     } catch (error) {
//       console.error('Error uploading post:', error);
//       setError('Failed to upload post. Please try again.');
//     }
//   };

//   const selectCategory = (category) => {
//     setInputs({ ...inputs, category });
//   };

//   return (
//     <Flex direction={'column'} gap={2}>
//       <Text fontSize={'bold'}>Title of your creation</Text>
//       <Input name='title' value={inputs.title} onChange={handleChange} placeholder='Title' />
//       <Text fontSize={'bold'}>Category</Text>
//       <HStack spacing={4}>
//         {['Addon', 'World', 'Skin', 'Server'].map((category) => (
//           <Tag
//             size={'md'}
//             key={category}
//             borderRadius='full'
//             variant={inputs.category === category ? 'solid' : 'outline'}
//             colorScheme='teal'
//             onClick={() => selectCategory(category)}
//             cursor='pointer'
//           >
//             <TagLabel>{category}</TagLabel>
//           </Tag>
//         ))}
//       </HStack>

//       <Text fontSize={'bold'}>Thumbnail</Text>
//       <Input type='file' accept='image/*' onChange={handleThumbnailChange} />
//       {thumbnailPreview && (
//         <Image src={thumbnailPreview} alt='Thumbnail Preview'
//           minW="340px"
//           minH="180px"
//           maxW="340px"
//           maxH="180px" borderRadius={'md'} mt={2} />
//       )}

//       <Text fontSize={'bold'}>Describe your creation</Text>
//       <Input name='description' value={inputs.description} onChange={handleChange} placeholder='Description' />

//       <Text fontSize={'bold'}>Features of your creation</Text>
//       <Input name='features' value={inputs.features} onChange={handleChange} placeholder='Features' />

//       <Text fontSize={'bold'}>Specification of your creation</Text>
//       <Input name='specification' value={inputs.specification} onChange={handleChange} placeholder='Specification' />

//       <Flex
//         border='2px dashed gray'
//         borderRadius='md'
//         p={4}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         align='center'
//         justify='center'
//         direction='column'
//       >
//         <TbDragDrop2 size='48' />
//         <Text>Drag & Drop your files here</Text>
//         <Input type='file' multiple accept='.zip,.mcaddon,.mcpack,.mcskin' onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
//         <Button onClick={() => inputRef.current.click()}>Select Files</Button>
//       </Flex>

//       {inputs.files.length > 0 && (
//         <VStack align='start' mt={4}>
//           <Text fontSize={'bold'}>Files to be uploaded:</Text>
//           {inputs.files.map((file, index) => (
//             <Text key={index}>{file.name}</Text>
//           ))}
//         </VStack>
//       )}

//       {error && <Text color='red.500'>{error}</Text>}

//       <Button onClick={handleUpload}>Post It</Button>
//     </Flex>
//   );
// };

// export default CreationForm;

// okay. so i wanted the path will be created like this on storage and firestore. /post/{id of our post}/all collected data such photo and file zip name will same like the name of {post id} and collected who create this so when we upload. our userid get submitted too beacuse we need to use it on postpage and content.jsx and can when we upload file just using like inputs style like upload thumbnail

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react';
// import { AiOutlineSend } from 'react-icons/ai';
// import Comment from '../../components/Comment/Comment';
// import { firestore, storage, auth } from '../../firebase/firebase';
// import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, getDownloadURL } from 'firebase/storage';
// import { useAuthState } from 'react-firebase-hooks/auth';

// const PostPage = () => {
//   const { id } = useParams();
//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [currentUser] = useAuthState(auth);
//   const [newCommentText, setNewCommentText] = useState('');
//   const [replyTo, setReplyTo] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const postDoc = await getDoc(doc(firestore, 'contents', id));
//       if (postDoc.exists()) {
//         setPost(postDoc.data());
//       }
//     };

//     const fetchComments = async () => {
//       const commentsSnapshot = await getDocs(collection(firestore, 'contents', id, 'comments'));
//       const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setComments(commentsList);
//     };

//     fetchPost();
//     fetchComments();
//   }, [id]);

//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   const handleDownload = async () => {
//     try {
//       const fileRef = ref(storage, `posts/${id}/${post.files}.zip`);
//       const url = await getDownloadURL(fileRef);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${post.title}.zip`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!newCommentText.trim() || !currentUser) return;

//     const newComment = {
//       userId: currentUser.uid,
//       avatar: currentUser.photoURL || '',
//       username: currentUser.displayName || 'Anonymous',
//       text: newCommentText,
//       createdAt: serverTimestamp(),
//       replyTo: replyTo ? { username: replyTo.username, text: replyTo.text } : null,
//     };

//     try {
//       const commentDocRef = await addDoc(collection(firestore, 'contents', id, 'comments'), newComment);
//       setComments([...comments, { id: commentDocRef.id, ...newComment }]);
//       setNewCommentText('');
//       setReplyTo(null);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteDoc(doc(firestore, 'contents', id, 'comments', commentId));
//       setComments(comments.filter(comment => comment.id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleReply = (comment) => {
//     setReplyTo(comment);
//   };

//   return (
//     <Flex direction='column' w='full' px={1} mt={-2} gap={5}>
//       <Flex p={2} gap={2}>
//         <Flex w='full' direction='column' justifyContent={{base:'left' , md: 'center' }} gap={1}>
//           <Text fontWeight='bold' fontSize={20}>{post.title}</Text>
//           <Flex alignItems='center' justifyContent={'left'}>
//             <Image mixW='full' maxW='full' src={post.thumbnail} borderRadius={10} />
//           </Flex>
//           <Text as='span' fontWeight='bold'> Created By {post.createdBy}</Text>
//           <Text as='span' fontSize={11}>Created at {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</Text>
//         </Flex>
//       </Flex>

//       <Flex direction='column'>
//         <Text>{post.description}</Text>
//         <Text>{post.features}</Text>
//         <Text>{post.specification}</Text>
//         <Button onClick={handleDownload}>Download Here</Button>
//       </Flex>

//       <Divider my={4} />

//       <Flex direction='column' gap={4}>
//         <Text fontSize='xl'>Comments</Text>
//         {post.comments.map((comment) => (
// 										<Comment key={comment.id} comment={comment} />
// 									))}

//         {replyTo && (
//           <Box mt={4} p={2} bg={bgColor} borderRadius="md">
//             <Text fontWeight="bold">Replying to {replyTo.username}</Text>
//             <Text fontSize="sm">{replyTo.text}</Text>
//           </Box>
//         )}

//         <Flex alignItems='center' w='full'>
//           <Flex alignItems='center' gap={2} w='full'>
//             <Avatar src={currentUser?.photoURL} name={currentUser?.displayName || 'Anonymous'} size={{ md: 'sm', base: 'xs' }} />
//             <InputGroup>
//               <Input
//                 fontSize={{ md: '14px', base: '10px' }}
//                 size={5}
//                 w='full'
//                 border='none'
//                 type='text'
//                 placeholder='Write a comment'
//                 value={newCommentText}
//                 onChange={(e) => setNewCommentText(e.target.value)}
//               />
//               <InputRightElement>
//                 <Box
//                   _hover={{ bg: 'whiteAlpha.300', color: 'blue.600' }}
//                   p={1}
//                   borderRadius={4}
//                   onClick={handleCommentSubmit}
//                 >
//                   <AiOutlineSend cursor='pointer' />
//                 </Box>
//               </InputRightElement>
//             </InputGroup>
//           </Flex>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// export default PostPage;
// on here can you add the share button to share the current link and here where the likes and dislike work here can you added it?
// for the <Text as='span' fontWeight='bold'> Created By {post.createdBy}</Text> make this linked to the user who create the post and get it from the firestore. but for the text it username of userid from it

// import { Box, VStack, useColorModeValue, Flex, Skeleton, SkeletonCircle, Image, Avatar, Text } from '@chakra-ui/react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore, storage } from '../../firebase/firebase';
// import { getDownloadURL, ref } from 'firebase/storage';

// const Content = ({ postId }) => {
//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const postDoc = await getDoc(doc(firestore, 'contents', postId));
//         if (postDoc.exists()) {
//           const postData = postDoc.data();

//           // Fetch thumbnail URL if it's stored in Firebase Storage
//           if (postData.thumbnail) {
//             const thumbnailURL = await getDownloadURL(ref(storage, postData.thumbnail));
//             postData.thumbnail = thumbnailURL;
//           }

//           // Fetch user avatar URL if it's stored in Firebase Storage
//           if (postData.createdBy.avatarUrl) {
//             const avatarURL = await getDownloadURL(ref(storage, postData.createdBy.avatarUrl));
//             postData.createdBy.avatarUrl = avatarURL;
//           }

//           setPost(postData);
//         }
//       } catch (error) {
//         console.error('Error fetching post data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPostData();
//   }, [postId]);

//   const handlePostClick = () => {
//     navigate(`/post/${postId}`);
//   };

//   return (
//     <>
    //   {isLoading ? (
    //     <Box
    //       maxWidth="360px"
    //       minWidth="360px"
    //       minHeight="270px"
    //       bgColor={bgColor}
    //       maxHeight="270px"
    //       borderRadius="md"
    //       overflow="hidden"
    //       padding={2}
    //       alignItems={'center'}
    //       justifyContent={'left'}
    //     >
    //       <VStack>
    //         <Box
    //           display="flex"
    //           alignItems="center"
    //           justifyContent={'left'}
    //           minW="340px"
    //           minH="180px"
    //           maxW="340px"
    //           maxH="180px"
    //           borderRadius={'md'}
    //         >
    //           <Skeleton
    //             minW="340px"
    //             minH="180px"
    //             maxW="340px"
    //             maxH="180px"
    //             borderRadius={'md'}
    //           />
    //         </Box>
    //         <Flex alignItems={'center'} columnGap={4} py={2} justifyContent={'left'} w={'340px'}>
    //           <SkeletonCircle size='12' />
    //           <VStack align="start" spacing={2} gap={3}>
    //             <Skeleton w={"274px"} h={4} />
    //             <Skeleton w={"200px"} h={4} />
    //           </VStack>
    //         </Flex>
    //       </VStack>
    //     </Box>
    //   ) : (
//         <Box
//           maxWidth="360px"
//           minWidth="360px"
//           minHeight="270px"
//           bgColor={bgColor}
//           maxHeight="270px"
//           borderRadius="md"
//           overflow="hidden"
//           padding={2}
//           alignItems={'center'}
//           justifyContent={'left'}
//           onClick={handlePostClick}
//           cursor="pointer"
//         >
//           <VStack>
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent={'left'}
//               minW="340px"
//               minH="180px"
//               maxW="340px"
//               maxH="180px"
//               borderRadius={'md'}
//             >
//               <Image
//                 minW="340px"
//                 minH="180px"
//                 maxW="340px"
//                 maxH="180px"
//                 borderRadius={'md'}
//                 src={post.thumbnail}
//                 alt='Thumbnail'
//               />
//             </Box>
//             <Flex alignItems={'center'} columnGap={4} py={2} justifyContent={'left'} w={'340px'}>
//               <Link to={`/user/${post.createdBy.uid}`} onClick={(e) => e.stopPropagation()}>
//                 <Avatar src={post.createdBy.avatarUrl} alt='User profile pic' size={12} />
//               </Link>
//               <VStack align="start" spacing={2} gap={3}>
//                 <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
//                 <Text fontSize="sm" color="gray.500">Uploaded at: {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</Text>
//               </VStack>
//             </Flex>
//           </VStack>
//         </Box>
//       )}
//     </>
//   );
// };

// export default Content;

// re-fix and connect all it from the firestore to get that so when we click the content.jsx it leading to the post/:postid and for the content i wanna it still sue skeleton while loading until get data from firebase and storage and for the content.jsx pls dont restyle it! and on here we wont use likes

// import { Flex, VStack } from "@chakra-ui/react";
// import Content from "./Content";
// import React from "react";

// const Contents = () => {
//   return (
//     <VStack w={'full'}>  
//       <Flex gap={4} w={'full'} overflowX="auto" justifyContent={'left'} alignItems={'flex-start'}>
//           <Content />
//           <Content />
//           <Content />
//           <Content />
//       </Flex>
//     </VStack>
//   );
// };

// export default Contents;
// and here where all contents  showed to here set the max is 10. and if less than 10 it show what they have. if it zero dont show anything

// import { Box, Container, Flex, Text } from "@chakra-ui/react";
// import Contents from "../../components/Content/Contents";
// import { TbWorld } from "react-icons/tb";
// import { AiOutlineSkin } from "react-icons/ai";
// import { BiWorld } from "react-icons/bi";
// import { IoExtensionPuzzleOutline } from "react-icons/io5";
// import React, { useEffect, useState } from "react";

// const HomePage = () => {
//   const [contents, setContents] = useState([]);

//   const addons = contents.filter(content => content.category === 'Addon');
//   const worlds = contents.filter(content => content.category === 'World');
//   const skins = contents.filter(content => content.category === 'Skin');
//   const servers = contents.filter(content => content.category === 'Server');

//   return (
//     <Container minWidth={'full'} overflowY="auto">
//       <Flex direction="column" minWidth={'full'}>
//         <Flex alignItems="center" gap={2} mt={4} minWidth={'full'}>
//           <IoExtensionPuzzleOutline />
//           <Text>Addons</Text>
//         </Flex>
//         <Box overflowX="auto" minWidth={'full'} alignContent={'flex-start'}>
//           <Contents contents={addons} />
//         </Box>

//         <Flex alignItems="center" gap={2} mt={4}>
//           <BiWorld />
//           <Text>Worlds</Text>
//         </Flex>
//         <Box overflowX="auto" w="100%">
//           <Contents contents={worlds} />
//         </Box>

//         <Flex alignItems="center" gap={2} mt={4}>
//           <AiOutlineSkin />
//           <Text>Skins</Text>
//         </Flex>
//         <Box overflowX="auto" w="100%">
//           <Contents contents={skins} />
//         </Box>

//         <Flex alignItems="center" gap={2} mt={4}>
//           <TbWorld />
//           <Text>Servers</Text>
//         </Flex>
//         <Box overflowX="auto" w="100%">
//           <Contents contents={servers} />
//         </Box>
//       </Flex>
//     </Container>
//   );
// };

// export default HomePage;
// and here where the content or post it have a category so they get there by their category
