import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  
  return ( <>
    <Flex>Selamat datang diberanda</Flex>
    <Link to={'/profile'}>babay</Link>
    <Button>Test</Button>
  </>
  )
}

export default HomePage