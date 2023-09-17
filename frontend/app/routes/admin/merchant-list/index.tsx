import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createColumnHelper } from '@tanstack/react-table'
import AdminLayout from '~/components/admin/AdminLayout'
import { DataTable } from '~/components/common/DataTable'
import type { ApiErrorResponse, User } from '~/types'
import { getMerchantByAdmin } from '~/utils/admin/users'
import { requireAdminUserId } from '~/utils/session.server'

const columnHelper = createColumnHelper<User>()

const columns = [
    columnHelper.accessor('name', {
        header: () => 'Merchant Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('email', {
        header: () => 'Merchant Email',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('phone', {
        header: () => 'Merchant Phone',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('isActive', {
        header: () => 'Is Active',
        cell: (info) => (info.getValue() ? 'Yes' : 'No'),
        footer: (info) => info.column.id,
    }),
]

export const meta: MetaFunction = () => {
    return {
        title: 'Merchant list - Dashboard',
        description: 'Merchant list',
    }
}

type LoaderData = {
    error?: string
    merchants: User[] | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireAdminUserId(request)
    const merchants = await getMerchantByAdmin(request)
    if (merchants && (merchants as ApiErrorResponse).message) {
        return {
            error: (merchants as ApiErrorResponse).message,
            merchants: null,
        } as LoaderData
    } else if (!merchants) {
        return {
            error: 'Something went wrong',
            merchants: null,
        } as LoaderData
    }
    return { merchants }
}

function MerchantList() {
    const { merchants } = useLoaderData<LoaderData>()
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Merchant list
                    </h2>
                    <DataTable columns={columns} data={merchants!} />
                </div>
            </main>
        </AdminLayout>
    )
}

export default MerchantList
