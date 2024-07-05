import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import SignIn from '../../components/ProfileModal/SignIn'
import SignUp from '../../components/ProfileModal/SignUp'

const AuthPage = () => {
  return (
    <>
      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUp/>
          </TabPanel>
          <TabPanel>
            <SignIn/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AuthPage