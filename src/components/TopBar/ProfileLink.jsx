import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = ({ onClose }) => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Button as={RouterLink} to={`/${authUser?.username}`} w={"100%"} gap={2} onClick={onClose}>
      <Flex alignItems="center" gap={2}>
        <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
        <Text>{authUser?.username}</Text>
        <Box display={{ base: "none", md: "block" }}></Box>
      </Flex>
    </Button>
  );
};

export default ProfileLink;
