import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import PackageHandlerLayout from '~/components/packagehandler/PackageHandlerLayout'
import { requirePackageHandlerUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    return await requirePackageHandlerUserId(request)
}

function Home() {
    return (
        <>
            <PackageHandlerLayout>
                <Outlet />
            </PackageHandlerLayout>
        </>
    )
}

export default Home
