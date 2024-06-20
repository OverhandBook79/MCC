import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} px={4} justifyContent={"center"} alignItems={"center"}>
      <Container p={0} maxW={"container.md"}>
        <Box display={{ base: "none", md: "block"}}>

        </Box>
        <Box>

        </Box>

      </Container>
    </Flex>
  )
}

export default AuthPage