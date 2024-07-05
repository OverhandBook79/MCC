import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import TopBar from "../../components/TopBar/TopBar";
const PageLayout = ({ children }) => {
	const [user, loading] = useAuthState(auth);

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;

	return (
		<>
		<Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
          <TopBar/>
        </Box>
		<Container maxW={"container.lg"}>
			<Flex gap={20}>
				<Box flex={2} py={10}>
					{children}
				</Box>
				<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					Ads
				</Box>
			</Flex>
		</Container>
		</>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
