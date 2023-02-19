import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Select,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Form, Link as RemixLink } from '@remix-run/react'
import LoginRegLeftSide from '~/components/common/loginRegLeftSide'
import Layout from '~/components/Layout'

export const meta: MetaFunction = () => ({
    title: 'Register',
})
function Register() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [pass, setPass] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')

    console.log('Confirm password', pass === confirmPass)

    return (
        <Layout>
            <div className="h-screen md:flex">
                <LoginRegLeftSide
                    title="Add your information"
                    subtitle="Please tell a bit about you and your business"
                />

                <div className="flex md:w-1/2 justify-center items-center bg-white overflow-auto overflow-y-scroll">
                    <Form className="w-3/4 lg:w-3/4 pt-32 pb-20">
                        <Text className="text-gray-700 mt-1 font-bold mb-3">
                            Personal Inforamtion
                        </Text>
                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="Maruf Ahmed"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Name is required.
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="userEmail"
                                    placeholder="jane@gmail.com"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Email is required.
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    type="tel"
                                    name="userPhone"
                                    placeholder="+8801234678910"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Phone number is required.
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <Text className="text-gray-700 font-bold mt-6">
                            Shop Information
                        </Text>
                        <Text as="small" className="text-gray-700 mb-3 block">
                            If you have more thant one busines, you can create
                            multiple shops later
                        </Text>
                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Shop Name</FormLabel>
                                <Input
                                    type="text"
                                    name="shopName"
                                    placeholder="Shop Name"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Shop name is required.
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Shop Email</FormLabel>
                                <Input
                                    type="email"
                                    name="shopEmail"
                                    placeholder="Email address"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Shop email is required.
                                </FormErrorMessage>
                            </FormControl>
                        </div>
                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Shop Address</FormLabel>
                                <Input
                                    type="text"
                                    name="shopAddress"
                                    placeholder="Shop Address"
                                    focusBorderColor="primary.500"
                                />
                                <FormErrorMessage>
                                    Shop address is required.
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Product Type</FormLabel>
                                <Select
                                    placeholder="Choose product type"
                                    name="productType"
                                    focusBorderColor="primary.500"
                                >
                                    <option value="book">Book</option>
                                    <option value="electronics">
                                        Electronics
                                    </option>
                                </Select>
                                <FormErrorMessage>
                                    Product type is required.
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Product Sub Category Type</FormLabel>
                                <Select
                                    placeholder="Choose sub Category type"
                                    name="subProductType"
                                    focusBorderColor="primary.500"
                                >
                                    <option value="history">History</option>
                                    <option value="computers">Computers</option>
                                </Select>
                                <FormErrorMessage>
                                    Sub product type is required.
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <p className="text-gray-700 font-bold mt-6 mb-3">
                            Create Password
                        </p>
                        <div className="flex justify-between gap-6 mb-3">
                            <FormControl isInvalid={false} isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter password"
                                        focusBorderColor="primary.500"
                                        onChange={(e) =>
                                            setPass(e.target.value)
                                        }
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

                            <FormControl
                                isInvalid={pass !== confirmPass}
                                isRequired
                            >
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        focusBorderColor="primary.500"
                                        onChange={(e) =>
                                            setConfirmPass(e.target.value)
                                        }
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
                                    {pass !== confirmPass
                                        ? "Password didn't match"
                                        : 'Please confirm your password'}
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                        <Button
                            type="submit"
                            variant="solid"
                            colorScheme="primary"
                            w="full"
                            mt="5"
                        >
                            Sign up
                        </Button>
                        <Text mt="5">
                            Already have account?{' '}
                            <Link
                                as={RemixLink}
                                to="/login"
                                color="primary.700"
                            >
                                Login
                            </Link>
                        </Text>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default Register
