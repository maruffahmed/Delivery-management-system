import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { requirePackageHandlerUserId } from '~/utils/session.server'
import PackageHandlerLayout from '~/components/packagehandler/PackageHandlerLayout'
import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import { getParcelsToPickUp } from '~/utils/packagehandler/parcel'
import { useLoaderData } from '@remix-run/react'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '~/components/common/DataTable'
import { Text } from '@chakra-ui/react'

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
    columnHelper.accessor('shop', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Shop',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelUser', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Shop Owner',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelUser', {
        cell: (info) => info.renderValue()?.phone,
        header: () => 'Owner phone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelPickUp.area', {
        cell: (info) => info.renderValue()?.name,
        header: () => 'Pickup Area',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('parcelPickUp', {
        cell: (info) => info.renderValue()?.address,
        header: () => 'Pickup Address',
        footer: (info) => info.column.id,
    }),
]

export const meta: MetaFunction = () => {
    return {
        title: 'Dashboard',
        description: 'Dashboard',
    }
}

type LoaderData = {
    error?: string
    parcels: Parcels | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requirePackageHandlerUserId(request)
    const parcels = await getParcelsToPickUp(request)
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

function ParcelToPickup() {
    const { parcels } = useLoaderData<LoaderData>()
    return (
        <PackageHandlerLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Parcel to pickup list
                    </h2>
                    {/* <!-- Table --> */}
                    <DataTable columns={columns} data={parcels?.data!} />
                </div>
            </main>
        </PackageHandlerLayout>
    )
}

export default ParcelToPickup
