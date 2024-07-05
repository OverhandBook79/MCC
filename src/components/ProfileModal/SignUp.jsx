import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    return (
        <Stack gap={2}>
            <Input
                placeholder='Full name'
                fontSize={14}
                type='text'
                size={"sm"}
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                w={'full'}
            />
            <Input
                placeholder='Username'
                fontSize={14}
                type='text'
                size={"sm"}
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                w={'full'}
            />
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                w={'full'}
            />
            <InputGroup>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    size={"sm"}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    w={'full'}
                />
                <InputRightElement h='full'>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button
                colorScheme="blue"
                mr={3}
                isLoading={loading}
                onClick={() => signup(inputs)}
                w={'full'}
            >
                Sign Up
            </Button>
        </Stack>
    )
}

export default SignUp