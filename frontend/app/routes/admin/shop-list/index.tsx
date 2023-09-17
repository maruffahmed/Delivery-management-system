import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createColumnHelper } from '@tanstack/react-table'
import AdminLayout from '~/components/admin/AdminLayout'
import { DataTable } from '~/components/common/DataTable'
import type { ApiErrorResponse, Shop, Shops } from '~/types'
import { getShopsByAdmin } from '~/utils/admin/shops'
import { requireAdminUserId } from '~/utils/session.server'

const columnHelper = createColumnHelper<Shop>()

const columns = [
    columnHelper.accessor('name', {
        header: () => 'Shop Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('address', {
        header: () => 'Shop Address',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('productType', {
        header: () => 'Shop Product Type',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('user', {
        header: () => 'Merchant Name',
        cell: (info) => info.getValue()?.name,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('user', {
        header: () => 'Merchant Phone',
        cell: (info) => info.getValue()?.phone,
        footer: (info) => info.column.id,
    }),
]

export const meta: MetaFunction = () => {
    return {
        title: 'Shop list - Dashboard',
        description: 'Shop list',
    }
}

type LoaderData = {
    error?: string
    shops: Shops | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireAdminUserId(request)
    const shops = await getShopsByAdmin(request)
    if (shops && (shops as ApiErrorResponse).message) {
        return {
            error: (shops as ApiErrorResponse).message,
            shops: null,
        } as LoaderData
    } else if (!shops) {
        return {
            error: 'Something went wrong',
            shops: null,
        } as LoaderData
    }
    return { shops }
}

function ShopList() {
    const { shops } = useLoaderData<LoaderData>()
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Shop list
                    </h2>
                    <DataTable columns={columns} data={shops?.data!} />
                </div>
            </main>
        </AdminLayout>
    )
}

export default ShopList
