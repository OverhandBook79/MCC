import { Heading, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { IoSearch } from "react-icons/io5";
import React from 'react'

const TopBar = () => {
  return (
  <>
    <Heading>
        Yahaha
    </Heading>
    <InputGroup>
    <Input placeholder='Search' />
    <InputRightAddon>
    <IoSearch />
    </InputRightAddon>
    </InputGroup>
  </>
  )
}

export default TopBar