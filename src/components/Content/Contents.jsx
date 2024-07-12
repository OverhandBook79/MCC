// import React from 'react';
// import { Box, Image, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';

// const Content = ({ content }) => {
//   return (
//     <LinkBox
//       as='article'
//       maxW='sm'
//       borderWidth='1px'
//       borderRadius='md'
//       overflow='hidden'
//       boxShadow='md'
//       m={2}
//     >
//       <Image src={content.thumbnail} alt={content.title} boxSize='100%' objectFit='cover' />
//       <Box p='6'>
//         <Box d='flex' alignItems='baseline'>
//           <Text
//             color='gray.500'
//             fontWeight='bold'
//             letterSpacing='wide'
//             fontSize='xs'
//             textTransform='uppercase'
//           >
//             {content.category}
//           </Text>
//         </Box>

//         <LinkOverlay as={RouterLink} to={`/post/${content.id}`}>
//           <Text mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
//             {content.title}
//           </Text>
//         </LinkOverlay>

//         <Text mt='2' color='gray.500'>
//           {content.description}
//         </Text>
//       </Box>
//     </LinkBox>
//   );
// };

// export default Content;
import React from 'react'

const Contents = () => {
  return (
    <div>Contents</div>
  )
}

export default Contents