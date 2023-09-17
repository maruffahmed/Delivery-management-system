import { Box, Button, Container, Text } from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
// import { requireUserId } from '~/utils/session.server'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'

export const meta: MetaFunction = () => ({
    title: 'Payments List',
})

export const loader: LoaderFunction = async ({ request }) => {
    // return await requireUserId(request)
    return null
}

function InvoicePage() {
    const componentRef = useRef<HTMLElement>(null)
    return (
        <>
            <Container maxW="container.xl" py="8">
                <ReactToPrint
                    trigger={() => <Button colorScheme="primary">Print</Button>}
                    content={() => componentRef?.current}
                />
                <section ref={componentRef}>
                    <div className="max-w-5xl mx-auto bg-white">
                        <article className="overflow-hidden">
                            <div className="bg-[white] rounded-b-md">
                                <div className="p-9">
                                    <div className="space-y-6 text-slate-700">
                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                        {/* <img
                                            className="object-cover h-12"
                                            src="https://pbs.twimg.com/profile_images/1513243060834123776/dL8-d7zI_400x400.png"
                                        /> */}

                                        <Box>
                                            <Text
                                                fontWeight="extrabold"
                                                fontSize="4xl"
                                                mb="0"
                                                _hover={{
                                                    textDecoration: 'unset',
                                                }}
                                            >
                                                DPDM
                                                <Text
                                                    color="primary.500"
                                                    display="inline"
                                                >
                                                    S
                                                </Text>
                                            </Text>
                                        </Box>
                                    </div>
                                </div>
                                <div className="p-9">
                                    <div className="flex w-full">
                                        <div className="grid grid-cols-4 gap-12">
                                            <div className="text-sm font-light text-slate-500">
                                                <p className="text-sm font-normal text-slate-700">
                                                    Invoice Detail:
                                                </p>
                                                <p>Unwrapped</p>
                                                <p>Fake Street 123</p>
                                                <p>San Javier</p>
                                                <p>CA 1234</p>
                                            </div>
                                            <div className="text-sm font-light text-slate-500">
                                                <p className="text-sm font-normal text-slate-700">
                                                    Billed To
                                                </p>
                                                <p>The Boring Company</p>
                                                <p>Tesla Street 007</p>
                                                <p>Frisco</p>
                                                <p>CA 0000</p>
                                            </div>
                                            <div className="text-sm font-light text-slate-500">
                                                <p className="text-sm font-normal text-slate-700">
                                                    Invoice Number
                                                </p>
                                                <p>000000</p>

                                                <p className="mt-2 text-sm font-normal text-slate-700">
                                                    Date of Issue
                                                </p>
                                                <p>00.00.00</p>
                                            </div>
                                            <div className="text-sm font-light text-slate-500">
                                                <p className="text-sm font-normal text-slate-700">
                                                    Terms
                                                </p>
                                                <p>0 Days</p>

                                                <p className="mt-2 text-sm font-normal text-slate-700">
                                                    Due
                                                </p>
                                                <p>00.00.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-9">
                                    <div className="flex flex-col mx-0 mt-8">
                                        <table className="min-w-full divide-y divide-slate-500">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                                                    >
                                                        Description
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                                    >
                                                        Quantity
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                                    >
                                                        Rate
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                                                    >
                                                        Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-slate-200">
                                                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                                        <div className="font-medium text-slate-700">
                                                            Delivery charge
                                                        </div>
                                                        <div className="mt-0.5 text-slate-500 sm:hidden">
                                                            1 unit at 200.00 Tk
                                                        </div>
                                                    </td>
                                                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                        1
                                                    </td>
                                                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                        200.00 Tk
                                                    </td>
                                                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        200.00 Tk
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-slate-200">
                                                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                                        <div className="font-medium text-slate-700">
                                                            COD Charge
                                                        </div>
                                                        <div className="mt-0.5 text-slate-500 sm:hidden">
                                                            1 unit at $.00
                                                        </div>
                                                    </td>
                                                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                        1
                                                    </td>
                                                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                        2.00 Tk
                                                    </td>
                                                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        2.00 Tk
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                    >
                                                        Subtotal
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                                                    >
                                                        Subtotal
                                                    </th>
                                                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        200.00 Tk
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                    >
                                                        Discount
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                                                    >
                                                        Discount
                                                    </th>
                                                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        0.00 Tk
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                    >
                                                        Tax
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                                                    >
                                                        Tax
                                                    </th>
                                                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        0.00 Tk
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                                                    >
                                                        Total
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                                                    >
                                                        Total
                                                    </th>
                                                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                        200.00 Tk
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </Container>
        </>
    )
}
export default InvoicePage
