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
} from '@chakra-ui/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
    Form,
    useActionData,
    useSearchParams,
    useTransition,
} from '@remix-run/react'
import type { ApiErrorResponse, LoginResponse } from '~/types'
import {
    badRequest,
    validateEmail,
    validatePassword,
    validateUrl,
} from '~/utils'
import {
    adminLogin,
    createUserSession,
    getAdminId,
} from '~/utils/session.server'

export type ActionData = {
    formError?: string
    fieldErrors?: {
        email?: string | undefined
        password?: string | undefined
    }
    fields?: {
        email?: string
        password?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const email = form.get('email')
    const password = form.get('password')
    const redirectTo = validateUrl(
        (form.get('redirectTo') as string) || '/admin/dashboard',
    )
    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof redirectTo !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = { email, password }
    const fieldErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    }
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    const user = await adminLogin({ email, password })
    if (user && (user as ApiErrorResponse).message) {
        return badRequest({
            fields,
            formError: (user as ApiErrorResponse).message,
        })
    } else if (!user) {
        return badRequest({
            fields,
            formError: 'Something is wrong! Please try again.',
        })
    }
    return createUserSession(
        (user as LoginResponse).user.id,
        (user as LoginResponse).access_token,
        (user as LoginResponse).user.roles[0].role.name,
        redirectTo,
    )
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getAdminId(request)
    if (userId) {
        return redirect('/admin/dashboard')
    }
    return null
}

function Login() {
    const actionData = useActionData<ActionData>()
    const [searchParams] = useSearchParams()
    const transition = useTransition()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'login'
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="/img/login-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="/img/login-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Login
                            </h1>
                            <Form method="post">
                                <Box id="form-error-message" mb="5">
                                    {actionData?.formError ? (
                                        <Alert
                                            status="error"
                                            variant="left-accent"
                                        >
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
                                    value={
                                        searchParams.get('redirectTo') ??
                                        undefined
                                    }
                                />
                                <FormControl
                                    isInvalid={
                                        actionData?.fieldErrors?.email?.length
                                            ? true
                                            : false
                                    }
                                    isRequired
                                >
                                    <FormLabel className="dark:text-white">
                                        Email
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="maruf@gmail.com"
                                        focusBorderColor="primary.500"
                                        className="dark:text-white"
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
                                        actionData?.fieldErrors?.password
                                            ?.length
                                            ? true
                                            : false
                                    }
                                    isRequired
                                >
                                    <FormLabel className="dark:text-white">
                                        Password
                                    </FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            type={show ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Enter password"
                                            focusBorderColor="primary.500"
                                            aria-invalid={
                                                Boolean(
                                                    actionData?.fieldErrors
                                                        ?.password,
                                                ) || undefined
                                            }
                                            aria-errormessage={
                                                actionData?.fieldErrors
                                                    ?.password
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
                                            <>
                                                {
                                                    actionData.fieldErrors
                                                        .password
                                                }
                                            </>
                                        ) : null}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    type="submit"
                                    name="_action"
                                    value="login"
                                    className="w-full mt-8"
                                    colorScheme="purple"
                                    isLoading={isSubmitting}
                                >
                                    Log in
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
