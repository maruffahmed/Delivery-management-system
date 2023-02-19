import React from 'react'
import type { ActionData } from '~/routes/login'
import type { Transition } from '@remix-run/react/dist/transition'
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
    Box,
    Spinner,
} from '@chakra-ui/react'

function LoginForm({
    actionData,
    searchParams,
    transition,
}: {
    actionData: ActionData | undefined
    searchParams: URLSearchParams
    transition: Pick<Transition, 'state'>
}) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <Form method="post" className="w-3/4 lg:w-2/4">
            <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get('redirectTo') ?? undefined}
            />
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
                    placeholder="maruf@gmail.com"
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
            <FormControl
                mt="4"
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

            <Box id="form-error-message">
                {actionData?.formError ? (
                    <Text color="red.600" mt="2" role="alert">
                        {actionData.formError}
                    </Text>
                ) : null}
            </Box>

            {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}

            <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                w="full"
                mt="10"
                disabled={transition.state === 'submitting'}
            >
                {transition.state !== 'idle' ? <Spinner /> : 'Log in'}
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
    )
}

export default LoginForm
