import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import AdminLayout from '~/components/admin/AdminLayout'
import { requireAdminUserId } from '~/utils/session.server'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '~/components/common/DataTable'
import { getParcelsForAdmin } from '~/utils/admin/parcels'
import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import { Link, useLoaderData } from '@remix-run/react'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'
import moment from 'moment'
import { Flex, Input, Select } from '@chakra-ui/react'

// type Person = {
//     createAt: string
//     id: string
//     status: string
//     shop
//     lastName: string
//     age: number
//     visits: number
//     status: string
//     progress: number
// }

// const data: Parcel[] = [
//     {
//         firstName: 'tanner',
//         lastName: 'linsley',
//         age: 24,
//         visits: 100,
//         status: 'In Relationship',
//         progress: 50,
//     },
//     {
//         firstName: 'tandy',
//         lastName: 'miller',
//         age: 40,
//         visits: 40,
//         status: 'Single',
//         progress: 80,
//     },
//     {
//         firstName: 'joe',
//         lastName: 'dirte',
//         age: 45,
//         visits: 20,
//         status: 'Complicated',
//         progress: 10,
//     },
// ]

const columnHelper = createColumnHelper<Parcel>()

const columns = [
    columnHelper.accessor('createdAt', {
        cell: (info) => moment(info.getValue()).format('LL'),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.parcelNumber, {
        id: 'parcelNumber',
        cell: (info) => (
            <Link
                to={`/admin/parcel-requests/${info.getValue()}`}
                className="text-purple-700 underline underline-offset-2"
            >
                {info.getValue()}
            </Link>
        ),
        header: () => 'Parcel number',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelStatus', {
        header: () => 'Status',
        cell: (info) => <ParcelStatusBadge status={info.getValue().name} />,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('shop', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Shop',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelPickUp.area', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Pickup Area',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelDeliveryArea', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Delivery Area',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelNumber', {
        cell: (info) => (
            <Link
                to={`/admin/parcel-action/assign/${info.renderValue()}`}
                className="text-purple-700 underline underline-offset-2"
            >
                Action
            </Link>
        ),
        header: () => 'Action',
        footer: (info) => info.column.id,
    }),
]

export const meta: MetaFunction = () => {
    return {
        title: 'Parcel Requests - Dashboard',
        description: 'Parcel Requests',
    }
}

type LoaderData = {
    error?: string
    parcels: Parcels | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireAdminUserId(request)
    const parcels = await getParcelsForAdmin(request)
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

function ParcelRequests() {
    const { parcels } = useLoaderData<LoaderData>()
    const [query, setQuery] = React.useState('')
    const [status, setStatus] = React.useState('')

    const filteredData = React.useMemo(() => {
        if (!parcels) return []
        // if (!query) return parcels.data
        return parcels.data.filter(
            (parcel) =>
                parcel.parcelNumber.includes(query) &&
                (status !== '' ? parcel.parcelStatus.name === status : true),
        )
    }, [parcels, query, status])
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Parcel requests
                    </h2>
                    {/* Search bar*/}
                    <Flex justifyContent="space-between">
                        <Input
                            placeholder="Search parcel number"
                            w="50%"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Select
                            placeholder="All"
                            value={status}
                            w="25%"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="picking-up">Picking Up</option>
                            <option value="processing">Processing</option>
                            <option value="in-transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                        </Select>
                    </Flex>
                    {/* <!-- Table --> */}
                    <DataTable columns={columns} data={filteredData!} />
                </div>
            </main>
        </AdminLayout>
    )
}

export default ParcelRequests
