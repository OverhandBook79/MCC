import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignin from '../../hooks/useSignin';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignIn = () => {
    
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signin } = useSignin();
    return (
        <Stack gap={2}>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <InputGroup>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    size={"sm"}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h='full'>
                <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
              <AlertIcon fontSize={12} />
              {error.message}
            </Alert>
            )}
            <Button 
            colorScheme="blue" 
            mr={3}
            isLoading={loading}
            onClick={() => signin(inputs)}>
                Sign In
            </Button>
        </Stack>
    )
}

export default SignIn