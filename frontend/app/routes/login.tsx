import type { MetaFunction } from '@remix-run/node'
import React from 'react'
import { Form, Link as RemixLink } from '@remix-run/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputRightElement,
    Button,
    InputGroup,
    Text,
    Link,
} from '@chakra-ui/react'
import LoginRegLeftSide from '~/components/common/loginRegLeftSide'

export const meta: MetaFunction = () => ({
    title: 'Login',
})
function Login() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <div className="h-screen md:flex">
            <LoginRegLeftSide
                title="Welcome!"
                subtitle="Enter your email and password to login to the dashboard"
            />

            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <Form className="w-3/4 lg:w-2/4">
                    <label className="block text-sm">
                        <FormControl isInvalid={false} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="maruf@gmail.com"
                                focusBorderColor="primary.500"
                            />
                            <FormErrorMessage>
                                Email is required.
                            </FormErrorMessage>
                        </FormControl>
                    </label>
                    <label className="block mt-4 text-sm">
                        <FormControl isInvalid={false} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    focusBorderColor="primary.500"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                        variant="outline"
                                        fontWeight="normal"
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                Password is required.
                            </FormErrorMessage>
                        </FormControl>
                    </label>

                    {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}

                    <Button
                        type="submit"
                        variant="solid"
                        colorScheme="primary"
                        w="full"
                        mt="10"
                    >
                        Log in
                    </Button>

                    <hr className="my-8" />

                    <Text className="mt-4">
                        <Link as={RemixLink} to="/" color="primary.700">
                            Forgot your password?
                        </Link>
                    </Text>
                    <p className="mt-1">
                        <Link as={RemixLink} to="/register" color="primary.700">
                            Create account
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default Login
