import { Box, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import SignIn from '../../components/ProfileModal/SignIn'
import SignUp from '../../components/ProfileModal/SignUp'

const AuthPage = () => {
  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'} w={'full'} h='full'>
        <Box w={'300px'}>
      <Tabs size='md' variant='enclosed' w={300} h='full'>
        <TabList w={300}>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels w={300}>
          <TabPanel w={300}>
            <SignUp w={300}/>
          </TabPanel >
          <TabPanel w={300}>
            <SignIn w={300}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
      </Flex>
    </>
  )
}

export default AuthPage