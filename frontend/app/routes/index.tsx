import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Layout from '~/components/Layout'
import { getUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (userId) {
        return redirect('/dashboard')
    }
    return null
}

function Home() {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    )
}

export default Home
