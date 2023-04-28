import React from 'react'
import AdminLayout from '~/components/admin/AdminLayout'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition,
} from '@remix-run/react'
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
    Text,
    Textarea,
} from '@chakra-ui/react'
import type { ApiErrorResponse, Parcel } from '~/types'
import {
    getParcelsForAdminByParcelNumber,
    updateParcelForAdminByParcelNumber,
} from '~/utils/admin/parcels'

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {
        email?: string | undefined
        password?: string | undefined
    }
    fields?: {
        customerName?: string
        customerAddress?: string
        customerPhone?: string
        customerParcelInvoiceId?: string
        parcelExtraInformation?: string
    }
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    const customerName = form.get('customerName')
    const customerAddress = form.get('customerAddress')
    const customerPhone = form.get('customerPhone')
    const customerParcelInvoiceId = form.get('customerParcelInvoiceId')
    const parcelExtraInformation = form.get('parcelExtraInformation')

    // const files = form.get("files")
    if (
        typeof customerName !== 'string' ||
        typeof customerAddress !== 'string' ||
        typeof customerPhone !== 'string' ||
        typeof customerParcelInvoiceId !== 'string' ||
        typeof parcelExtraInformation !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        customerName,
        customerAddress,
        customerPhone,
        customerParcelInvoiceId,
        parcelExtraInformation,
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdPackageHandler = await updateParcelForAdminByParcelNumber(
            request,
            params.parcelId,
            fields,
        )
        return redirect(`/admin/parcel-requests`)
    } catch (error) {
        return badRequest({
            formError: error,
        })
    }
}

type LoaderData = {
    error?: string
    parcel: Parcel | null
}

export const loader: LoaderFunction = async ({ params, request }) => {
    await requireAdminUserId(request)

    const parcel = await getParcelsForAdminByParcelNumber(
        request,
        params.parcelId,
    )
    if (parcel && (parcel as ApiErrorResponse).message) {
        return {
            error: (parcel as ApiErrorResponse).message,
            parcel: null,
        } as LoaderData
    } else if (!parcel) {
        return {
            error: 'Something went wrong',
            parcel: null,
        } as LoaderData
    }

    return { parcel }
}

export const meta: MetaFunction = ({
    data,
}: {
    data: LoaderData | undefined
}) => {
    if (!data) {
        return {
            title: 'Wrong path',
        }
    }
    return {
        title: `${data.parcel?.customerName} - ${data.parcel?.parcelNumber}`,
    }
}

function SingleFieldPackageHandler() {
    const { parcel } = useLoaderData<LoaderData>()
    const actionData = useActionData<ActionData>()
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'updateParcel'

    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Modify parcel{' '}
                        <Text as="span" color="purple.500">
                            #{parcel?.parcelNumber}
                        </Text>
                    </h2>

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
                    <Form method="post" className="flex flex-col gap-5">
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Customer name
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="customerName"
                                    placeholder="Enter customer name"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={parcel?.customerName}
                                />
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Customer phone
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="customerPhone"
                                    placeholder="Enter customer phone number"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={parcel?.customerPhone}
                                />
                            </FormControl>
                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Customer address
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="customerAddress"
                                    placeholder="Enter customer address"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={parcel?.customerAddress}
                                />
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Customer parcel invoice id
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="customerParcelInvoiceId"
                                    placeholder="Enter invoice ID"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        parcel?.customerParcelInvoiceId || ''
                                    }
                                />
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Parcel extra information
                                </FormLabel>
                                <Textarea
                                    name="parcelExtraInformation"
                                    placeholder="Parcel extra information"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        parcel?.parcelExtraInformation || ''
                                    }
                                />
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            name="_action"
                            value="updateParcel"
                            colorScheme="purple"
                            isLoading={isSubmitting}
                            alignSelf="flex-start"
                            mb="4"
                        >
                            Update
                        </Button>
                    </Form>
                </div>
            </main>
        </AdminLayout>
    )
}

export default SingleFieldPackageHandler
