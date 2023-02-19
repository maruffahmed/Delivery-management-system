import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
    title: 'Dashboard',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function Dashboard() {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    )
}

export default Dashboard
