import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import AdminLayout from '~/components/admin/AdminLayout'
import { requireAdminUserId } from '~/utils/session.server'
import { CiShop } from 'react-icons/ci'
import { MdOutlinePendingActions } from 'react-icons/md'
import type { AdminStatistics } from '~/types'
import { getAdminStatistics } from '~/utils/admin/statistics'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return {
        title: 'Dashboard',
        description: 'Dashboard',
    }
}

type LoaderData = {
    error?: string
    adminStatistics: AdminStatistics | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireAdminUserId(request)
    const adminStatistics = await getAdminStatistics(request)
    return { adminStatistics }
}

function Home() {
    const { adminStatistics } = useLoaderData<LoaderData>()
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Dashboard
                    </h2>
                    {/* <!-- CTA --> */}

                    {/* <!-- Cards --> */}
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        {/* <!-- Card --> */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total merchant
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    {adminStatistics?.merchants}
                                </p>
                            </div>
                        </div>
                        {/* <!-- Card --> */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                                <CiShop />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Shops
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    {adminStatistics?.shops}
                                </p>
                            </div>
                        </div>
                        {/* <!-- Card --> */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total parcel request
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    {adminStatistics?.parcels}
                                </p>
                            </div>
                        </div>
                        {/* <!-- Card --> */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                                <MdOutlinePendingActions />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Pending parcel request
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    {adminStatistics?.pendingParcels}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    )
}

export default Home
