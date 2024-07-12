import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Ads = () => {
  return (
    <Flex mt={3} w='300px'>
        <VStack w='300px' height={'full'}>
                <Text>Ads Zone</Text>
                <Button>Hello</Button>
                <Button>Funds</Button>
        </VStack>
    </Flex>
  )
}

export default Ads