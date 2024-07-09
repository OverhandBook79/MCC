import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

const Ads = () => {
  return (
    <>
    <Flex mt={3} w='full'>
        <VStack w='full'>
            <Flex w='full'>
            <Box>
                Support our site with Ads and Fund
            </Box>
            <Button>
                Fund
            </Button>
            </Flex>

        </VStack>
    </Flex>
    </>
  )
}

export default Ads