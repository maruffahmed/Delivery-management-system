import React from 'react'
import AdminLayout from '~/components/admin/AdminLayout'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { badRequest } from '~/utils'
import { requireAdminUserId } from '~/utils/session.server'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { receiveParcelByAdmin } from '~/utils/admin/parcels'
import type { ApiErrorResponse } from '~/types'

export const meta: MetaFunction = () => ({
    title: 'Receive Parcel by Admin',
})

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {}
    fields?: {
        parcelNumber?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const parcelNumber = form.get('parcelNumber')

    // const files = form.get("files")
    if (typeof parcelNumber !== 'string') {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    // const fields = {
    //     parcelNumber,
    // }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdPackageHandler = await receiveParcelByAdmin(
            request,
            parcelNumber,
        )
        if (
            createdPackageHandler &&
            (createdPackageHandler as ApiErrorResponse).message
        ) {
            return badRequest({
                formError: (createdPackageHandler as ApiErrorResponse).message,
            })
        } else if (!createdPackageHandler) {
            return badRequest({
                formError: 'Something went wrong',
            })
        }
        return {
            formSuccess: {
                message: 'Parcel receive successfully',
            },
        } as ActionData
    } catch (error) {
        return badRequest({
            formError: error,
        })
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    return await requireAdminUserId(request)
}

const ParcelActionReceive = () => {
    const actionData = useActionData<ActionData>()
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'receiveParcel'
    const formRef = React.useRef<HTMLFormElement>(null)
    const focusInput = React.useRef<HTMLInputElement>(null)
    // Reset form
    React.useEffect(() => {
        if (!isSubmitting) {
            formRef.current?.reset()
            focusInput.current?.focus()
        }
    }, [isSubmitting])
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Parcel action receive
                    </h2>
                    {actionData?.formError ? (
                        <Box id="form-error-message" mb="5">
                            <Alert status="error" variant="left-accent">
                                <AlertIcon />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    {actionData.formError}
                                </AlertDescription>
                            </Alert>
                        </Box>
                    ) : null}
                    {actionData?.formSuccess?.message ? (
                        <Box id="form-error-message" mb="5">
                            <Alert status="success" variant="left-accent">
                                <AlertIcon />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>
                                    {actionData.formSuccess.message}
                                </AlertDescription>
                            </Alert>
                        </Box>
                    ) : null}
                    <Form
                        method="post"
                        className="flex flex-col gap-5"
                        ref={formRef}
                    >
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Parcel number
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="parcelNumber"
                                    placeholder="Enter parcel number"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        actionData?.fields?.parcelNumber
                                    }
                                    ref={focusInput}
                                />
                            </FormControl>
                        </div>
                        <Button
                            type="submit"
                            name="_action"
                            value="receiveParcel"
                            colorScheme="purple"
                            isLoading={isSubmitting}
                            alignSelf="flex-start"
                            mb="4"
                        >
                            Receive
                        </Button>
                    </Form>
                </div>
            </main>
        </AdminLayout>
    )
}

export default ParcelActionReceive
