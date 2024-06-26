import { Image, Box, } from '@chakra-ui/react';
import ContentFoot from './ContentFoot';
import { useNavigate } from 'react-router-dom';

const Content = ({ img, title, date, username, avatar }) => {
  const navigate = useNavigate();
  const post = () => {
    navigate('/post')
  }; 
  return (
    <>
    <Box border={'1px solid gray'} p={1} borderRadius={10} cursor={"pointer"} onClick={post} userSelect={"none"} w={"250px"} h={"190px"}>
        <Image src={img} alt={title} userSelect={"none"} borderRadius={10}/>
        <ContentFoot src={avatar} username={username} title={title} date={date} />
    </Box>
    </>
  )
}

export default Content