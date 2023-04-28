import React from 'react'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { requirePackageHandlerUserId } from '~/utils/session.server'
import PackageHandlerLayout from '~/components/packagehandler/PackageHandlerLayout'
import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import {
    deliverParcelByPackageHandler,
    getParcelsToDelivery,
} from '~/utils/packagehandler/parcel'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '~/components/common/DataTable'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Text,
} from '@chakra-ui/react'
import { badRequest } from '~/utils'

const columnHelper = createColumnHelper<Parcel>()

const columns = [
    columnHelper.accessor((row) => row.parcelNumber, {
        id: 'parcelNumber',
        cell: (info) => <Text color="purple.500">{info.getValue()}</Text>,
        header: () => 'Parcel number',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelStatus', {
        header: () => 'Status',
        cell: (info) => <ParcelStatusBadge status={info.getValue().name} />,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelProductType', {
        cell: (info) => info.renderValue(),
        header: () => 'Product type',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('customerName', {
        cell: (info) => info.renderValue(),
        header: () => 'Customer name',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('customerPhone', {
        cell: (info) => info.renderValue(),
        header: () => 'Customer phone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelDeliveryArea', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Delivery Area',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('customerAddress', {
        cell: (info) => info.renderValue(),
        header: () => 'Delivery Address',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelNumber', {
        cell: (info) => (
            <Form method="post">
                <input
                    type="hidden"
                    name="parcelNumber"
                    value={info.getValue()}
                />
                <Button
                    type="submit"
                    name="_action"
                    value="deliver"
                    colorScheme="purple"
                >
                    Deliver
                </Button>
            </Form>
        ),
        header: () => 'Delivery Address',
        footer: (info) => info.column.id,
    }),
]

export const meta: MetaFunction = () => {
    return {
        title: 'Deliverable parcel list',
    }
}
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

    // console.table({ parcelNumber, handlerType, handlerId })
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
        const deliverParcel = await deliverParcelByPackageHandler(
            request,
            parcelNumber,
        )
        if (deliverParcel && (deliverParcel as ApiErrorResponse).message) {
            return badRequest({
                formError: (deliverParcel as ApiErrorResponse).message,
            })
        } else if (!deliverParcel) {
            return badRequest({
                formError: 'Something went wrong',
            })
        }
        return {
            formSuccess: {
                message: 'Parcel delivered successfully',
            },
        } as ActionData
    } catch (error) {
        return badRequest({
            formError: error,
        })
    }
}

type LoaderData = {
    error?: string
    parcels: Parcels | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requirePackageHandlerUserId(request)
    const parcels = await getParcelsToDelivery(request)
    if (parcels && (parcels as ApiErrorResponse).message) {
        return {
            error: (parcels as ApiErrorResponse).message,
            parcels: null,
        } as LoaderData
    } else if (!parcels) {
        return {
            error: 'Something went wrong',
            parcels: null,
        } as LoaderData
    }
    return { parcels }
}

function ParcelToDelivery() {
    const { parcels } = useLoaderData<LoaderData>()
    const actionData = useActionData<ActionData>()
    return (
        <PackageHandlerLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Parcel to deliver list
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
                    {/* <!-- Table --> */}
                    <DataTable columns={columns} data={parcels?.data!} />
                </div>
            </main>
        </PackageHandlerLayout>
    )
}

export default ParcelToDelivery
