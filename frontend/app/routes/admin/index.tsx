import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import AdminLayout from '~/components/admin/AdminLayout'
import { requireAdminUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    return await requireAdminUserId(request)
}

function Home() {
    return (
        <>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </>
    )
}

export default Home
