import { Image, Box, VStack, Text, useColorModeValue, Avatar, Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
const Content = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <>
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
              <Skeleton w={"260px"} h={5}/>
              <Skeleton w={"200px"} h={3}/>
            </VStack>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default Content;

// import { Image, Box, VStack, Text, useColorModeValue, Avatar, Flex, Skeleton } from '@chakra-ui/react';
// import { Link, useNavigate } from 'react-router-dom';
// import { timeAgo } from "../../utils/timeAgo";
// import { useEffect, useState } from 'react';

// const truncateText = (text, maxWidth = 345) => {
//   if (text.length <= maxWidth) return text;

//   // Truncate text and ensure a complete word is displayed
//   const truncatedText = text.slice(0, maxWidth);
//   const lastSpaceIndex = truncatedText.lastIndexOf(" ");
//   return lastSpaceIndex !== -1
//     ? `${truncatedText.slice(0, lastSpaceIndex)}...`
//     : truncatedText + "...";
// };

// const Content = ({ id, title, createdAt }) => {
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const bgColor = useColorModeValue("gray.50", "gray.900");

//   const postLink = () => {
//     navigate(`/post/${docRef.id}`);
//   };

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
//   return (
//     <>
//       {creatorProfile ? (
//         <Box
//           bgColor={bgColor}
//           maxWidth="360px"
//           maxHeight="270px"
//           borderRadius="md"
//           overflow="hidden"
//           cursor="pointer"
//           onClick={postLink}
//           w="360px"
//           h="270px"
//           padding={2}
//           alignItems={'center'}
//           justifyContent={'left'}
//         >
//           <VStack>
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent={'left'}
//               bgColor={"red"}
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
//                 src={post.thumbnail}
//                 alt='{post.title} thumbnail'
//                 objectFit="contain"
//                 borderRadius={'md'}
//               />
//             </Box>
//             <Flex alignItems={'center'} gap={1} py={2} justifyContent={'left'} w={'340px'}>
//               <Link to={`/${creatorProfile.username}`}>
//                 <Avatar src={creatorProfile.profilePicURL} alt="Profile Picture" size={"sm"} />
//               </Link>
//               <VStack align="start" spacing={2} gap={1}>
//                 <Text fontWeight="bold" maxW="345px" noOfLines={1}>
//                   {post.title}
//                 </Text>
//                 <Text fontSize="sm">Uploaded on: {timeAgo(post.createdAt)}</Text>
//               </VStack>
//             </Flex>
//           </VStack>
//         </Box>
//       ) : (
//         <Box
//           maxWidth="360px"
//           bgColor={bgColor}
//           maxHeight="270px"
//           borderRadius="md"
//           overflow="hidden"
//           w="360px"
//           h="270px"
//           padding={2}
//           alignItems={'center'}
//           justifyContent={'left'}
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
//               <Skeleton
//                 minW="340px"
//                 minH="180px"
//                 maxW="340px"
//                 maxH="180px"
//                 borderRadius={'md'}
//               />
//             </Box>
//             <Flex alignItems={'center'} gap={1} py={2} justifyContent={'left'} w={'340px'}>
//                 <SkeletonCircle size='10' />
//               <VStack align="start" spacing={2} gap={1}>
//                   <Skeleton w={"340px"} h={"10px"} />
//                 <Text fontSize="sm">Uploaded on: {timeAgo(post.createdAt)}</Text>
//               </VStack>
//             </Flex>
//           </VStack>
//         </Box>
//       )}
//     </>
//   );
// };

// export default Content;
