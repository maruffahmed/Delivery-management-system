import React from 'react'
import AdminLayout from '~/components/admin/AdminLayout'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'

export const meta: MetaFunction = () => ({
    title: 'Add new merchant payment',
})

export const loader: LoaderFunction = async ({ request }) => {
    return null
}

function MerchantPaymentAdd() {
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Add new merchant payment
                    </h2>
                    <Form method="post" className="flex flex-col gap-5">
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                            <FormControl isRequired mb="4">
                                <FormLabel>Select the parcel</FormLabel>
                                <Select
                                    name="parcelId"
                                    placeholder="Select parcel"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                >
                                    <option value="1">Parcel 1</option>
                                    <option value="2">Parcel 2</option>
                                    <option value="3">Parcel 3</option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Total payent amount
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                />
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            name="_action"
                            value="addNewPackageHandler"
                            colorScheme="purple"
                            alignSelf="flex-start"
                            mb="4"
                            as={Link}
                            to="/admin/merchant-payments"
                        >
                            Add
                        </Button>
                    </Form>
                </div>
            </main>
        </AdminLayout>
    )
}

export default MerchantPaymentAdd
