import { Avatar, Flex, Text } from '@chakra-ui/react';

const ContentFoot = ({ title, date, username, avatar }) => {
  return (
    <Flex gap={1} p={1} alignItems={"center"}>
        <Avatar name={username} size={"sm"} src={avatar}/>
        <Flex direction="column" alignItems="flex-start">
        <Text fontSize={12} mb={1}>{title}</Text>
        <Text fontSize={10}>{date}</Text>
        </Flex>
    </Flex>
  )
}

export default ContentFoot