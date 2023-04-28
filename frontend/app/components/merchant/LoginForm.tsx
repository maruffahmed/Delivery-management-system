import React from 'react'
import type { ActionData } from '~/routes/(merchant)/login'
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
    Link,
    Box,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text,
} from '@chakra-ui/react'

function LoginForm({
    actionData,
    searchParams,
    transition,
}: {
    actionData: ActionData | undefined
    searchParams: URLSearchParams
    transition: Pick<Transition, 'state' | 'submission'>
}) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'login'

    return (
        <Form method="post" className="w-3/4 lg:w-2/4">
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
            </Box>
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

            {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}

            <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                w="full"
                mt="10"
                name="_action"
                value="login"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Spinner /> : 'Log in'}
            </Button>

            <hr className="my-8" />

            {/* <Text className="mt-4">
                <Link as={RemixLink} to="/" color="primary.700">
                    Forgot your password?
                </Link>
            </Text> */}
            <Text className="mt-1">
                <Link as={RemixLink} to="/register" color="primary.700">
                    Create account
                </Link>
            </Text>
        </Form>
    )
}

export default LoginForm
