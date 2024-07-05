import React from 'react';
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import TopBar from "../../components/TopBar/TopBar";
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  const isGuestPage = location.pathname === '/guest';

  return (
    <>
      {isGuestPage ? (
        <Box width="100vw" height="100vh">
          {children}
        </Box>
      ) : (
        <Container maxW={"container.lg"}>
          <Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
            <TopBar />
          </Box>
          <Flex>
            <Box flex={2} py={10} mt={9} w={"full"}>
              {children}
            </Box>
            <Box flex={3} mr={20} display={{ base: "none", md: "block" }} maxW={"250px"} mt={20}>
              Ads
            </Box>
          </Flex>
        </Container>
      )}
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
