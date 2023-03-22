import {
    Badge,
    Container,
    Flex,
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
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import { CgSandClock } from 'react-icons/cg'
import { GiCardPickup } from 'react-icons/gi'
import { getParcels } from '~/utils/merchant/parcels'
import type { ApiErrorResponse, Parcels, ParcelStatus } from '~/types'
import { useLoaderData } from '@remix-run/react'
import moment from 'moment'

export const meta: MetaFunction = () => ({
    title: 'Pracel List',
})

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
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Your all parcel
                </Heading>
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
                            {parcels?.data.length ? (
                                parcels?.data.map((parcel) => (
                                    <Tr key={parcel.id}>
                                        <Td>
                                            <Menu>
                                                <MenuButton
                                                    as={Button}
                                                    colorScheme="primary"
                                                    variant="outline"
                                                >
                                                    <Icon
                                                        as={BsThreeDotsVertical}
                                                    />
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem>Edit</MenuItem>
                                                    <MenuItem color="red.500">
                                                        Delete
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                        <Td>
                                            {moment(parcel.createdAt).format(
                                                'LL',
                                            )}
                                        </Td>
                                        <Td>{parcel.parcelPickUp?.name}</Td>
                                        <Td>
                                            <Stack>
                                                <Text>
                                                    ID:{' '}
                                                    {parcel.parcelNumber.toUpperCase()}
                                                </Text>
                                                <Text>
                                                    Invoice:{' '}
                                                    {
                                                        parcel.customerParcelInvoiceId
                                                    }
                                                </Text>
                                            </Stack>
                                        </Td>
                                        <Td>{parcel?.shop?.name}</Td>
                                        <Td>
                                            <Text>{parcel.customerName}</Text>
                                            <Text>{parcel.customerPhone}</Text>
                                            <Text>
                                                {parcel.customerAddress}
                                            </Text>
                                            <Text>
                                                {
                                                    parcel?.parcelDeliveryArea
                                                        ?.district.name
                                                }
                                            </Text>
                                            <Text>
                                                {
                                                    parcel?.parcelDeliveryArea
                                                        ?.name
                                                }
                                            </Text>
                                        </Td>
                                        <Td>
                                            <ParcelStatusBadge
                                                status={
                                                    parcel.parcelStatus.name
                                                }
                                            />
                                        </Td>
                                        <Td>
                                            <Text>
                                                Tk.{' '}
                                                {parcel.parcelCashCollection}{' '}
                                                Cash Collection
                                            </Text>
                                            <Text>
                                                Tk. {parcel.parcelCharge} Charge
                                            </Text>
                                        </Td>
                                        {/* <Td>Regular Delivery</Td> */}
                                        <Td>
                                            {moment(parcel.updatedAt).format(
                                                'LL',
                                            )}
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={10} textAlign="center">
                                        No parcel found
                                    </Td>
                                </Tr>
                            )}
                            {/* <Tr>
                                <Td>Feb 12, 2023</Td>
                                <Td>Uttara Sector - 10</Td>
                                <Td>ID:23A212SUS8HFK</Td>
                                <Td>Maruf Fasion</Td>
                                <Td>
                                    <Text>Emon</Text>
                                    <Text>01789393745</Text>
                                    <Text>Hazipur-Ghaturia,</Text>
                                    <Text>MolamgariHat, Kalai,</Text>
                                    <Text>Joypurhat</Text>
                                    <Text>Kalai</Text>
                                </Td>
                                <Td>
                                    <ParcelStatusBadge status="delivered" />
                                </Td>
                                <Td>
                                    <Text>Tk. 130 Cash Collection</Text>
                                    <Text>Tk. 131.3 Charge</Text>
                                </Td>
                                <Td>Regular Delivery</Td>
                                <Td>Mar 05, 2023</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            colorScheme="primary"
                                        >
                                            <Icon as={BsThreeDotsVertical} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>Edit</MenuItem>
                                            <MenuItem color="red.500">
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}

export function ParcelStatusBadge({
    status,
}: {
    status: 'pending' | 'canceled' | 'picked-up' | 'delivered'
}) {
    const colorScheme =
        status === 'pending'
            ? 'cyan'
            : status === 'canceled'
            ? 'red'
            : status === 'picked-up'
            ? 'green'
            : 'green'
    const title =
        status === 'pending'
            ? 'Pending'
            : status == 'canceled'
            ? 'Canceled'
            : status == 'picked-up'
            ? 'Picked up'
            : 'Delivered'

    const icon =
        status === 'pending'
            ? CgSandClock
            : status === 'canceled'
            ? MdOutlineCancel
            : status === 'picked-up'
            ? GiCardPickup
            : CiDeliveryTruck
    return (
        <Badge colorScheme={colorScheme} variant="outline" borderRadius={5}>
            <Flex align="center" gap={1}>
                <Icon as={icon} fontSize="lg" />
                <Text as="span">{title}</Text>
            </Flex>
        </Badge>
    )
}

export default ParcelList
