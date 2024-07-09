import React from 'react';
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import TopBar from "../../components/TopBar/TopBar";
import Ads from '../../components/Ads/Ads';

const PageLayout = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <>
        <Flex>
        <Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
            <TopBar />
          </Box>
            <Container maxW={"full"}>
          <Flex>
            <Box flex={2} py={10} mt={9} w={"full"} >
              {children}
            </Box>
            <Box flex={3} mr={20} display={{ base: "none", md: "block" }} maxW={"250px"} minW={"250px"} mt={20}>
              <Ads />
            </Box>
          </Flex>
        </Container>
        </Flex>
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
