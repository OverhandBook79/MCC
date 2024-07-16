import { Box, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import SignIn from '../../components/ProfileModal/SignIn';
import SignUp from '../../components/ProfileModal/SignUp';

const AuthPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex alignItems="center" justifyContent="center" w="100vw" h="100vh" bgColor={bgColor}>
      <Box
        w="350px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Sign In</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <SignIn />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default AuthPage;
