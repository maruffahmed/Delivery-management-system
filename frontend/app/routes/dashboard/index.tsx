import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Link,
    Text,
} from '@chakra-ui/react'
import { Link as RemixLink } from '@remix-run/react'
import OverViewCard from '~/components/merchant/dashboard/OverViewCard'

export const OrderSummary = [
    {
        id: 1,
        labelText: 'Orders placed',
        value: 10,
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 2,
        labelText: 'Orders delivered',
        value: 8,
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 3,
        labelText: 'Orders in transit',
        value: 0,
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 4,
        labelText: 'Orders returned',
        value: 2,
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 5,
        labelText: 'Successful Delivery',
        value: '90%',
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 6,
        labelText: 'Orders to be returned',
        value: 0,
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
]

export const PaymentSummary = [
    {
        id: 1,
        labelText: 'Total sales using REDX',
        value: 'Tk. 13219.00',
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 2,
        labelText: 'Total delivery fees paid',
        value: 'Tk. 2996.80',
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 3,
        labelText: 'Payment Processing',
        value: 'Tk. 0',
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
    {
        id: 4,
        labelText: 'Paid amount',
        value: 'Tk. 10353.50',
        tooltipText:
            'Total sum of parcels that have been created and picked up by REDX',
    },
]

function Dashboard() {
    return (
        <Box bg="whitesmoke" minH="100vh">
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Welcome, Maruf
                </Heading>
                <Box my="10">
                    <Text as="small" fontSize="sm" color="gray.600">
                        Overview of your order summary
                    </Text>

                    <SimpleGrid mt="5" columns={{ sm: 2, md: 3 }} spacing="10">
                        {OrderSummary.length
                            ? OrderSummary.map((order) => (
                                  <OverViewCard key={order.id} order={order} />
                              ))
                            : null}
                    </SimpleGrid>
                </Box>
                <Box my="10">
                    <Text as="small" fontSize="sm" color="gray.600">
                        Overview of your payment summary
                    </Text>

                    <SimpleGrid mt="5" columns={{ sm: 2, md: 3 }} spacing="10">
                        {PaymentSummary.length
                            ? PaymentSummary.map((order) => (
                                  <OverViewCard key={order.id} order={order} />
                              ))
                            : null}
                    </SimpleGrid>
                </Box>
                <Text>
                    কল করুন @{' '}
                    <Text as="span" fontWeight="bold" color="primary.500">
                        ০৯৬১০০০৭৩৩৯
                    </Text>{' '}
                    | কোন প্রশ্ন আছে?{' '}
                    <Link
                        as={RemixLink}
                        to="/"
                        fontWeight="bold"
                        color="primary.500"
                    >
                        FAQ দেখে নিন
                    </Link>
                </Text>
            </Container>
        </Box>
    )
}

export default Dashboard
