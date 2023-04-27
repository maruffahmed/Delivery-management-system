import React from 'react'
import AdminLayout from '~/components/admin/AdminLayout'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from '~/utils'
import { getUserToken, requireAdminUserId } from '~/utils/session.server'
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition,
} from '@remix-run/react'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from '@chakra-ui/react'
import type { ApiErrorResponse, Parcel } from '~/types'
import {
    assignFieldPackageHandlerToParcel,
    getParcelsForAdminByParcelNumber,
} from '~/utils/admin/parcels'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'
import { useQuery } from 'react-query'
import { getUserRolesClient } from '~/utils/admin/CSR_API'

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {}
    fields?: {
        parcelNumber?: string
        handlerType?: string
        handlerId?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    await requireAdminUserId(request)

    const form = await request.formData()
    const parcelNumber = form.get('parcelNumber')
    const handlerType = form.get('handlerType')
    const handlerId = form.get('handlerId')

    // console.table({ parcelNumber, handlerType, handlerId })
    // const files = form.get("files")
    if (
        typeof parcelNumber !== 'string' ||
        typeof handlerType !== 'string' ||
        typeof handlerId !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        parcelNumber,
        handlerType,
        handlerId,
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdPackageHandler = await assignFieldPackageHandlerToParcel(
            request,
            {
                ...fields,
                handlerId: Number(handlerId),
            },
        )
    } catch (error) {
        return badRequest({
            formError: error,
        })
    }

    return redirect(`/admin/parcel-requests`)
}

type LoaderData = {
    error?: string
    parcel: Parcel | null
    userToken?: string
}

export const loader: LoaderFunction = async ({ params, request }) => {
    await requireAdminUserId(request)
    const userToken = await getUserToken(request)

    const parcel = await getParcelsForAdminByParcelNumber(
        request,
        params.parcelNumber,
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

    return { parcel, userToken }
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
const ParcelActionAssign = () => {
    const actionData = useActionData<ActionData>()
    const { parcel, userToken } = useLoaderData<LoaderData>()
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') ===
            'addNewPackageHandler'

    const [handlerType, setHandlerType] = React.useState<string>()

    const { data: userRoles } = useQuery({
        queryKey: ['userRoles', parcel?.parcelDeliveryArea?.id, handlerType],
        queryFn: () =>
            getUserRolesClient(
                parcel?.parcelDeliveryArea?.id,
                handlerType,
                userToken,
            ),
    })
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Assign package handler for{' '}
                        <Text as="span" color="purple.500">
                            #{parcel?.parcelNumber}
                        </Text>
                    </h2>

                    <Text mb="8">
                        Current status:{' '}
                        <ParcelStatusBadge
                            status={parcel?.parcelStatus.name!}
                        />{' '}
                    </Text>

                    {actionData?.formError && (
                        <Alert status="error" mb="8">
                            <AlertIcon />
                            <AlertTitle mr={2}>Error!</AlertTitle>
                            <AlertDescription>
                                {actionData.formError}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Form
                        method="post"
                        className="flex flex-col lg:flex-row gap-5"
                    >
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                            <FormControl isRequired isReadOnly={true} mb="4">
                                <FormLabel className="dark:text-white">
                                    Parcel number
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="parcelNumber"
                                    placeholder="Enter name"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={parcel?.parcelNumber}
                                />
                            </FormControl>
                            <FormControl isRequired mb="4">
                                <FormLabel>Package handler type</FormLabel>
                                <Select
                                    name="handlerType"
                                    placeholder="Select type"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    onChange={(e) =>
                                        setHandlerType(e.target.value)
                                    }
                                    defaultValue={handlerType || undefined}
                                >
                                    <option value="pickupman">
                                        Pickup man
                                    </option>
                                    <option value="deliveryman">
                                        Delivery man
                                    </option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired mb="4">
                                <FormLabel>Package handler</FormLabel>
                                <Select
                                    name="handlerId"
                                    placeholder="Select type"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={actionData?.fields?.handlerId}
                                >
                                    {userRoles?.data.data.length
                                        ? userRoles?.data.data.map((role) => (
                                              <option
                                                  value={role.id}
                                                  key={role.id}
                                              >
                                                  {role?.User?.name}
                                              </option>
                                          ))
                                        : null}
                                </Select>
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            name="_action"
                            value="addNewPackageHandler"
                            colorScheme="purple"
                            isLoading={isSubmitting}
                            alignSelf="flex-start"
                            mb="4"
                        >
                            Assign
                        </Button>
                    </Form>
                </div>
            </main>
        </AdminLayout>
    )
}

export default ParcelActionAssign
