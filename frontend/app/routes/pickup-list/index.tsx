import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import type { ApiErrorResponse, PickupPoints } from '~/types'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Container,
    Heading,
    useDisclosure,
} from '@chakra-ui/react'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'
import { useLoaderData } from '@remix-run/react'
import { getShopPickUpPoints } from '~/utils/merchant/shops'
import PickupListGrid from '~/components/merchant/pickup-list/PickupListGrid'

export const meta: MetaFunction = () => ({
    title: 'Dashboard',
})

export type PickupLoaderData = {
    pickupPoints: PickupPoints
    error?: string
}
export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    const pickupPoints = await getShopPickUpPoints(request)
    if (pickupPoints && (pickupPoints as ApiErrorResponse).message) {
        return {
            error: (pickupPoints as ApiErrorResponse).message,
            pickupPoints: { data: [] },
        } as PickupLoaderData
    } else if (!pickupPoints) {
        return {
            error: 'Something is wrong. Please reload the browser.',
            pickupPoints: { data: [] },
        } as PickupLoaderData
    }
    return { pickupPoints } as PickupLoaderData
}

function PickupList() {
    const { pickupPoints, error } = useLoaderData<PickupLoaderData>()
    const { onOpen } = useDisclosure()
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading
                    as="h3"
                    fontSize="3xl"
                    pb="6"
                    borderBottom="4px"
                    borderColor="primary.500"
                    display="inline-block"
                >
                    Pickup points
                </Heading>
                {error ? (
                    <Alert status="error" variant="left-accent" my="5">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    <PickupListGrid
                        pickupPoints={pickupPoints}
                        onOpen={onOpen}
                    />
                )}
            </Container>
        </Layout>
    )
}

export default PickupList
