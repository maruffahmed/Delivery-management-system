import {
    Container,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
    cancelParcelByParcelNumber,
    getParcels,
} from '~/utils/merchant/parcels'
import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import moment from 'moment'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'
import { badRequest } from '~/utils'

export const meta: MetaFunction = () => ({
    title: 'Pracel List',
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
        const cancelParcel = await cancelParcelByParcelNumber(
            request,
            parcelNumber,
        )
        if (cancelParcel && (cancelParcel as ApiErrorResponse).message) {
            return badRequest({
                formError: (cancelParcel as ApiErrorResponse).message,
            })
        } else if (!cancelParcel) {
            return badRequest({
                formError: 'Something went wrong',
            })
        }
        return {
            formSuccess: {
                message: 'Parcel has been canceled successfully',
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
    await requireUserId(request)
    const parcels = await getParcels(request)
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

function ParcelList() {
    const { error, parcels } = useLoaderData<LoaderData>()
    const actionData = useActionData<ActionData>()
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Your all parcel
                </Heading>
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
                <TableContainer my={10}>
                    <Table size="lg">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Action</Th>
                                <Th>Creation Date</Th>
                                <Th>Pickup Name</Th>
                                <Th>ID</Th>
                                <Th>Shop</Th>
                                <Th>Customer Details</Th>
                                <Th>Status</Th>
                                <Th>Payment Info</Th>
                                {/* <Th>More Info</Th> */}
                                <Th>Last Update</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {error ? (
                                <Tr>
                                    <Td colSpan={9}>
                                        <Text color="red.500">{error}</Text>
                                    </Td>
                                </Tr>
                            ) : null}
                            {parcels?.data.length ? (
                                parcels?.data.map((parcel) => (
                                    <ParcelTableTr
                                        key={parcel.id}
                                        parcel={parcel}
                                    />
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={9} textAlign="center">
                                        No parcel found
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}

export function ParcelTableTr({ parcel }: { parcel: Parcel }) {
    return (
        <Tr>
            <Td>
                <Menu>
                    <MenuButton
                        as={Button}
                        colorScheme="primary"
                        variant="outline"
                    >
                        <Icon as={BsThreeDotsVertical} />
                    </MenuButton>
                    <MenuList>
                        <Form method="post">
                            <input
                                type="hidden"
                                name="parcelNumber"
                                value={parcel.parcelNumber}
                            />
                            <MenuItem
                                color="red.500"
                                as="button"
                                type="submit"
                                name="_action"
                                value="cancelParcel"
                                isDisabled={
                                    parcel.parcelStatus.name !== 'pending'
                                }
                            >
                                Cancel
                            </MenuItem>
                        </Form>
                    </MenuList>
                </Menu>
            </Td>
            <Td>{moment(parcel.createdAt).format('LL')}</Td>
            <Td>{parcel.parcelPickUp?.name}</Td>
            <Td>
                <Stack>
                    <Text>
                        ID: <b>{parcel.parcelNumber.toUpperCase()}</b>
                    </Text>
                    <Text>Invoice: {parcel.customerParcelInvoiceId}</Text>
                </Stack>
            </Td>
            <Td>{parcel?.shop?.name}</Td>
            <Td>
                <Text>{parcel.customerName}</Text>
                <Text>{parcel.customerPhone}</Text>
                <Text>{parcel.customerAddress}</Text>
                <Text>{parcel?.parcelDeliveryArea?.district.name}</Text>
                <Text>{parcel?.parcelDeliveryArea?.name}</Text>
            </Td>
            <Td>
                <ParcelStatusBadge status={parcel.parcelStatus.name} />
            </Td>
            <Td>
                <Text>Tk. {parcel.parcelCashCollection} Cash Collection</Text>
                <Text>Tk. {parcel.parcelCharge} Charge</Text>
            </Td>
            {/* <Td>Regular Delivery</Td> */}
            <Td>{moment(parcel.updatedAt).format('LL')}</Td>
        </Tr>
    )
}

export default ParcelList
