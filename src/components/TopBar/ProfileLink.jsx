import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
		<Button as={Link} to={'/profile'} onClick={onClose} w={"100%"} gap={2}>
			<Flex alignItems="center">
				<Link
					display={"flex"}
					to={`/${authUser?.username}`}
					as={RouterLink}
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
				>
					<Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
					<Box display={{ base: "none", md: "block" }}></Box>
				</Link>
			</Flex>
		</Button>
	);
};

export default ProfileLink;
