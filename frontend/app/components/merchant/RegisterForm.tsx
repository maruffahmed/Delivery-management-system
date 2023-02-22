import type { ActionData } from '~/routes/register'
import type { Transition } from '@remix-run/react/dist/transition'
import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Select,
    Spinner,
    Text,
    useToast,
} from '@chakra-ui/react'
import { Form, Link as RemixLink } from '@remix-run/react'

function RegisterForm({
    actionData,
    transition,
}: {
    actionData: ActionData | undefined
    transition: Pick<Transition, 'state' | 'submission'>
}) {
    const formRef = React.useRef<HTMLFormElement>(null)
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'signup'

    const toast = useToast({
        isClosable: true,
    })
    const errorToast = 'error-toast'
    const successToast = 'success-toast'

    React.useEffect(() => {
        if (
            actionData?.formSuccess?.message.length &&
            !toast.isActive(successToast)
        ) {
            toast({
                id: successToast,
                title: actionData.formSuccess.message,
                description: 'Login now',
                status: 'success',
            })
            formRef.current?.reset()
        }
        if (actionData?.formError?.length && !toast.isActive(errorToast)) {
            toast({
                id: errorToast,
                title: actionData.formError,
                status: 'error',
            })
        }
    }, [actionData, toast])
    return (
        <Form
            ref={formRef}
            method="post"
            className="w-3/4 lg:w-3/4 h-full py-10 xl:py-20"
        >
            <Box id="form-error-message" mb="5">
                {actionData?.formError ? (
                    <Alert status="error" variant="left-accent">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            {actionData.formError}
                        </AlertDescription>
                    </Alert>
                ) : null}

                {actionData?.formSuccess?.message ? (
                    <Alert status="success" variant="left-accent">
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            {actionData.formSuccess.message}.{' '}
                            <Link
                                as={RemixLink}
                                to="/login"
                                textDecoration="underline"
                            >
                                Login here
                            </Link>
                        </AlertDescription>
                    </Alert>
                ) : null}
            </Box>
            <Text className="text-gray-700 mt-1 font-bold mb-3">
                Personal Inforamtion
            </Text>
            <div className="flex justify-between gap-6 mb-3">
                <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                        type="text"
                        name="fullName"
                        placeholder="Maruf Ahmed"
                        focusBorderColor="primary.500"
                    />
                </FormControl>
                <FormControl
                    isInvalid={
                        actionData?.fieldErrors?.email?.length ? true : false
                    }
                    isRequired
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder="jane@gmail.com"
                        focusBorderColor="primary.500"
                        defaultValue={actionData?.fields?.email}
                        aria-errormessage={
                            actionData?.fieldErrors?.email
                                ? 'email-error'
                                : undefined
                        }
                    />
                    <FormErrorMessage>
                        {actionData?.fieldErrors?.email ? (
                            <>{actionData.fieldErrors.email}</>
                        ) : null}
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div className="flex justify-between gap-6 mb-3">
                <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="+8801234678910"
                        focusBorderColor="primary.500"
                    />
                </FormControl>
            </div>

            <Text className="text-gray-700 font-bold mt-6">
                Shop Information
            </Text>
            <Text as="small" className="text-gray-700 mb-3 block">
                If you have more thant one busines, you can create multiple
                shops later
            </Text>
            <div className="flex justify-between gap-6 mb-3">
                <FormControl isRequired>
                    <FormLabel>Shop Name</FormLabel>
                    <Input
                        type="text"
                        name="shopName"
                        placeholder="Shop Name"
                        focusBorderColor="primary.500"
                        defaultValue="maurf shop"
                    />
                </FormControl>
                <FormControl
                    isInvalid={
                        actionData?.fieldErrors?.shopEmail?.length
                            ? true
                            : false
                    }
                    isRequired
                >
                    <FormLabel>Shop Email</FormLabel>
                    <Input
                        type="email"
                        name="shopEmail"
                        placeholder="Email address"
                        focusBorderColor="primary.500"
                        // defaultValue={actionData?.fields?.shopEmail}
                        aria-errormessage={
                            actionData?.fieldErrors?.shopEmail
                                ? 'email-error'
                                : undefined
                        }
                        defaultValue="marufah76@gmail.com"
                    />
                    <FormErrorMessage>
                        {actionData?.fieldErrors?.shopEmail ? (
                            <>{actionData.fieldErrors.shopEmail}</>
                        ) : null}
                    </FormErrorMessage>
                </FormControl>
            </div>
            <div className="flex justify-between gap-6 mb-3">
                <FormControl isRequired>
                    <FormLabel>Shop Address</FormLabel>
                    <Input
                        type="text"
                        name="shopAddress"
                        placeholder="Shop Address"
                        focusBorderColor="primary.500"
                        defaultValue="Sector #10, Uttara, Dhaka"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Product Type</FormLabel>
                    <Select
                        placeholder="Choose product type"
                        name="productType"
                        focusBorderColor="primary.500"
                        defaultValue="book"
                    >
                        <option value="book">Book</option>
                        <option value="electronics">Electronics</option>
                    </Select>
                </FormControl>
            </div>

            <div className="flex justify-between gap-6 mb-3">
                <FormControl isRequired>
                    <FormLabel>Product Sub Category Type</FormLabel>
                    <Select
                        placeholder="Choose sub Category type"
                        name="subProductType"
                        focusBorderColor="primary.500"
                        defaultValue="history"
                    >
                        <option value="history">History</option>
                        <option value="computers">Computers</option>
                    </Select>
                </FormControl>
            </div>

            <p className="text-gray-700 font-bold mt-6 mb-3">Create Password</p>
            <div className="flex justify-between gap-6 mb-3">
                <FormControl
                    isInvalid={
                        actionData?.fieldErrors?.password?.length ? true : false
                    }
                    isRequired
                >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={show ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            focusBorderColor="primary.500"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.password) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.password
                                    ? 'password-error'
                                    : undefined
                            }
                            defaultValue="111111"
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
                        {actionData?.fieldErrors?.password ? (
                            <>{actionData.fieldErrors.password}</>
                        ) : null}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={
                        actionData?.fieldErrors?.confirmPassword?.length
                            ? true
                            : false
                    }
                    isRequired
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={show ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            focusBorderColor="primary.500"
                            aria-invalid={
                                Boolean(
                                    actionData?.fieldErrors?.confirmPassword,
                                ) || undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.confirmPassword
                                    ? 'confirmPassword-error'
                                    : undefined
                            }
                            defaultValue="111111"
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
                        {actionData?.fieldErrors?.confirmPassword ? (
                            <>{actionData.fieldErrors.confirmPassword}</>
                        ) : null}
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
                name="_action"
                value="signup"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Spinner /> : 'Sign up'}
            </Button>

            <Text mt="5">
                Already have account?{' '}
                <Link as={RemixLink} to="/login" color="primary.700">
                    Login
                </Link>
            </Text>
        </Form>
    )
}

export default RegisterForm
