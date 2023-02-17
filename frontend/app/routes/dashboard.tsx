import { Outlet } from '@remix-run/react'
import Layout from '~/components/Layout'

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
