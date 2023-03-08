import type { ApiErrorResponse } from '~/types'
import type { ShopLoaderData } from '../shop-list/index'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Link,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { Link as RemixLink, useLoaderData } from '@remix-run/react'
import OverViewCard from '~/components/merchant/dashboard/OverViewCard'
import { useShopProvider } from '~/context/ShopProvider'
import React from 'react'
import { getShops } from '~/utils/merchant/shops'
import { requireUserId } from '~/utils/session.server'
import Layout from '~/components/Layout'

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

export const meta: MetaFunction = () => ({
    title: 'Dashboard',
})
export const loader: LoaderFunction = async ({
    request,
}): Promise<ShopLoaderData> => {
    await requireUserId(request)
    const shops = await getShops(request)
    if (shops && (shops as ApiErrorResponse).message) {
        return {
            error: (shops as ApiErrorResponse).message,
            shops: { data: [] },
        } as ShopLoaderData
    } else if (!shops) {
        return {
            error: 'Something is wrong. Please reload the browser.',
            shops: { data: [] },
        } as ShopLoaderData
    }
    return { shops } as ShopLoaderData
}
function Dashboard() {
    const { shops, error } = useLoaderData<ShopLoaderData>()
    const { activeShop, storeActiveShop, resetShopProvider } = useShopProvider()
    React.useEffect(() => {
        if (shops.data.length) {
            if (!activeShop) {
                storeActiveShop(shops.data[0])
            }
        } else {
            resetShopProvider()
        }
    }, [storeActiveShop, shops, activeShop, resetShopProvider])

    return (
        <Layout>
            <Box bg="whitesmoke" minH="100vh">
                <Container maxW="container.xl" py="8">
                    {error && (
                        <Alert status="error" variant="left-accent" my="5">
                            <AlertIcon />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Heading size="lg">Welcome, {activeShop?.name}</Heading>
                    <Box my="10">
                        <Text as="small" fontSize="sm" color="gray.600">
                            Overview of your order summary
                        </Text>

                        <SimpleGrid
                            mt="5"
                            columns={{ sm: 2, md: 3 }}
                            spacing="10"
                        >
                            {OrderSummary.length
                                ? OrderSummary.map((order) => (
                                      <OverViewCard
                                          key={order.id}
                                          order={order}
                                      />
                                  ))
                                : null}
                        </SimpleGrid>
                    </Box>
                    <Box my="10">
                        <Text as="small" fontSize="sm" color="gray.600">
                            Overview of your payment summary
                        </Text>

                        <SimpleGrid
                            mt="5"
                            columns={{ sm: 2, md: 3 }}
                            spacing="10"
                        >
                            {PaymentSummary.length
                                ? PaymentSummary.map((order) => (
                                      <OverViewCard
                                          key={order.id}
                                          order={order}
                                      />
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
        </Layout>
    )
}

export default Dashboard
