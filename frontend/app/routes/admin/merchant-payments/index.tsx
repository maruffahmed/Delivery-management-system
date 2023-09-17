import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { MetaFunction } from '@remix-run/node'
import moment from 'moment'
import AdminLayout from '~/components/admin/AdminLayout'
import { Link as RemixLink } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return {
        title: 'Merchant payments - Dashboard',
        description: 'Merchant payments',
    }
}
function ShopList() {
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Merchant payments
                    </h2>
                    <Table variant="striped">
                        <Thead>
                            <Tr>
                                <Th>Invoice ID</Th>
                                <Th>Merchant name</Th>
                                <Th>Shop name</Th>
                                <Th>Created At</Th>
                                <Th>Cash Collection</Th>
                                <Th>Delivery Charge</Th>
                                <Th>COD Charge</Th>
                                <Th>Total Paid</Th>
                                <Th>Download</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '123456789',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 100,
                                    deliveryCharge: 10,
                                    codCharge: 1,
                                    totalPaid: 90,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '454189161',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 1500,
                                    deliveryCharge: 150,
                                    codCharge: 15,
                                    totalPaid: 1335,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '5644812069',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 1000,
                                    deliveryCharge: 100,
                                    codCharge: 10,
                                    totalPaid: 890,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '123456789',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 100,
                                    deliveryCharge: 10,
                                    codCharge: 1,
                                    totalPaid: 90,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '987654321',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 1500,
                                    deliveryCharge: 150,
                                    codCharge: 15,
                                    totalPaid: 1335,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '123456789',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 1000,
                                    deliveryCharge: 100,
                                    codCharge: 10,
                                    totalPaid: 890,
                                }}
                            />
                            <PaymentsTableTr
                                payment={{
                                    id: 1,
                                    invoiseId: '2394984564',
                                    merchantName: 'Md Maruf Ahmed',
                                    shopName: 'Shop1',
                                    createdAt: new Date().toString(),
                                    updatedAt: new Date().toString(),
                                    cashCollection: 100,
                                    deliveryCharge: 10,
                                    codCharge: 1,
                                    totalPaid: 90,
                                }}
                            />
                        </Tbody>
                    </Table>
                </div>
            </main>
        </AdminLayout>
    )
}

export function PaymentsTableTr({ payment }: { payment: any }) {
    return (
        <Tr>
            <Td>{payment.invoiseId}</Td>
            <Td>{payment.merchantName}</Td>
            <Td>{payment.shopName}</Td>
            <Td>{moment(payment.createdAt).format('LL')}</Td>
            {/* <Td>{payment.cashCollection}</Td> */}
            <Td>{payment.deliveryCharge}</Td>
            <Td>{payment.codCharge}</Td>
            <Td>{payment.totalPaid}</Td>
            <Td>
                <Button
                    colorScheme="blue"
                    size="sm"
                    as={RemixLink}
                    to="/payments-list/invoice"
                >
                    Download
                </Button>
            </Td>
        </Tr>
    )
}

export default ShopList
