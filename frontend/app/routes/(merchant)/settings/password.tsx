import React from 'react'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    Heading,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'
import { badRequest } from '~/utils'
import { changePassword } from '~/utils/merchant/settings'
import type { ApiErrorResponse } from '~/types'

export const meta: MetaFunction = () => ({
    title: 'Password - Settings',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

export type ChangePasswordActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fields?: {
        currentPassword?: string
        newPassword?: string
        confirmPassword?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const currentPassword = form.get('currentPassword')
    const newPassword = form.get('newPassword')
    const confirmPassword = form.get('confirmPassword')

    if (
        typeof currentPassword !== 'string' ||
        typeof newPassword !== 'string' ||
        typeof confirmPassword !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }
    const fields = {
        currentPassword,
        newPassword,
        confirmPassword,
    }
    const newPassUser = await changePassword(request, {
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
    })
    if (newPassUser && (newPassUser as ApiErrorResponse).message) {
        return badRequest({
            formError: (newPassUser as ApiErrorResponse).message,
            fields,
        })
    } else if (!newPassUser) {
        return badRequest({
            formError: 'Something is wrong. Please try again.',
            fields,
        })
    }
    return json({
        formSuccess: { message: 'Password changed successfully.' },
    })
}

function PasswordSettings() {
    const actionData = useActionData<ChangePasswordActionData>()
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'changePassword'
    const [show, setShow] = React.useState(false)
    const handleShowPass = () => setShow(!show)

    return (
        <>
            <Heading as="h4" fontSize="2xl" pb="6" display="inline-block">
                Change your password.
            </Heading>
            <Form method="post">
                {/* Current password input field */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" my="6">
                    <FormControl isRequired>
                        <FormLabel>Current password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={show ? 'text' : 'password'}
                                name="currentPassword"
                                placeholder="Enter password"
                                focusBorderColor="primary.500"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowPass}
                                    variant="outline"
                                    fontWeight="normal"
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>
                {/* New password inpu field */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
                    <FormControl isRequired>
                        <FormLabel>New password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={show ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="Enter password"
                                focusBorderColor="primary.500"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowPass}
                                    variant="outline"
                                    fontWeight="normal"
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Confirm new password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={show ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                focusBorderColor="primary.500"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowPass}
                                    variant="outline"
                                    fontWeight="normal"
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>
                <Button
                    type="submit"
                    name="_action"
                    value="changePassword"
                    colorScheme="primary"
                    mt="8"
                    px="8"
                    py="6"
                    isLoading={isSubmitting}
                >
                    Update
                </Button>
                {actionData?.formError?.length ? (
                    <Alert status="error" mt="4">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            {actionData.formError}
                        </AlertDescription>
                    </Alert>
                ) : null}
                {actionData?.formSuccess?.message ? (
                    <Alert status="success" mt="4">
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            {actionData.formSuccess.message}
                        </AlertDescription>
                    </Alert>
                ) : null}
            </Form>
        </>
    )
}

export default PasswordSettings
