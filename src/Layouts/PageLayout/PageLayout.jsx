import React from 'react';
import { Box, Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import TopBar from "../../components/TopBar/TopBar";
import Ads from '../../components/Ads/Ads';

const PageLayout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const bgColor = useColorModeValue("gray.50", "gray.900");
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
            <Box py={10} mt={9} w={"full"}>
              {children}
            </Box>
            <Box flex={3} display={{ base: "none", md: "block" }} maxW={"300px"} minW={"300px"} mt={20} top={0} position={'sticky'} >
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
