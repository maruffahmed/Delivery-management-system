import {
    Container,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link as RemixLink } from '@remix-run/react'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'
import moment from 'moment'
import type { ParcelPayment } from '~/types'

export const meta: MetaFunction = () => ({
    title: 'Payments List',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function PaymentList() {
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Your all payments
                </Heading>
                <TableContainer my={10}>
                    <Table size="lg">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Invoice ID</Th>
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
                </TableContainer>
            </Container>
        </Layout>
    )
}

export function PaymentsTableTr({ payment }: { payment: ParcelPayment }) {
    return (
        <Tr>
            <Td>{payment.invoiseId}</Td>
            <Td>{moment(payment.createdAt).format('LL')}</Td>
            <Td>{payment.cashCollection}</Td>
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

export default PaymentList
