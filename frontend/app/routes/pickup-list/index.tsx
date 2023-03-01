import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
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
import { useActionData, useLoaderData } from '@remix-run/react'
import { addShopPickUpPoint, getShopPickUpPoints } from '~/utils/merchant/shops'
import PickupListGrid from '~/components/merchant/pickup-list/PickupListGrid'
import AddPickupPointDrawer from '~/components/merchant/pickup-list/AddPickupPointDrawer'
import { badRequest } from '~/utils'

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

export type PickupPointActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fields?: {
        pickupName?: string
        pickupAddress?: string
        pickupArea?: string
        pickupPhone?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get('_action')

    // Shop add form fields
    const pickupName = form.get('pickupName')
    const pickupAddress = form.get('pickupAddress')
    const pickupArea = form.get('pickupArea')
    const pickupPhone = form.get('pickupPhone')

    // Shop edit form fields
    const updateShopId = form.get('updateShopId')
    const updateShopName = form.get('updateShopName')
    const updateShopEmail = form.get('updateShopEmail')
    const updateShopAddress = form.get('updateShopAddress')

    switch (action) {
        case 'addShopPickup': {
            if (
                typeof pickupName !== 'string' ||
                typeof pickupAddress !== 'string' ||
                typeof pickupArea !== 'string' ||
                typeof pickupPhone !== 'string'
            ) {
                return badRequest({
                    formError: `Form not submitted correctly.`,
                })
            }

            const fields = {
                pickupName,
                pickupAddress,
                pickupArea,
                pickupPhone,
            }

            const pickupPoint = await addShopPickUpPoint(request, fields)
            if (pickupPoint && (pickupPoint as ApiErrorResponse).message) {
                return badRequest({
                    formError: (pickupPoint as ApiErrorResponse).message,
                })
            } else if (!pickupPoint) {
                return badRequest({
                    formError: `Something went wrong. Please try again.`,
                })
            }

            return json({
                formSuccess: { message: 'New Pickup point add successfully' },
            })
        }
        case 'editShop':
            break
        default:
            return badRequest({ formError: `Form not submitted correctly.` })
    }
}

function PickupList() {
    const { pickupPoints, error } = useLoaderData<PickupLoaderData>()
    const actionData = useActionData<PickupPointActionData>()
    const {
        onOpen: onPickupPointOpen,
        isOpen: isPickupPointOpen,
        onClose: onPickupPointClose,
    } = useDisclosure({
        // isOpen: true,
    })
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
                <AddPickupPointDrawer
                    actionData={actionData}
                    isOpen={isPickupPointOpen}
                    onClose={onPickupPointClose}
                />
                {error ? (
                    <Alert status="error" variant="left-accent" my="5">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    <PickupListGrid
                        pickupPoints={pickupPoints}
                        onOpen={onPickupPointOpen}
                    />
                )}
            </Container>
        </Layout>
    )
}

export default PickupList
