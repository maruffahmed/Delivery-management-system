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
import {
    addShopPickUpPoint,
    getShopPickUpPoints,
    updateShopPickUpPoint,
} from '~/utils/merchant/shops'
import PickupListGrid from '~/components/merchant/pickup-list/PickupListGrid'
import AddPickupPointDrawer from '~/components/merchant/pickup-list/AddPickupPointDrawer'
import { badRequest } from '~/utils'
import EditPickupPointDrawer from '~/components/merchant/pickup-list/EditPickupPointDrawer'
import PickupPointProvider from '~/context/PickupPointProvider'

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
        pickupId?: string
        pickupName?: string
        pickupAddress?: string
        pickupArea?: string
        pickupPhone?: string
        pickupStatus?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get('_action')

    // Pickup point add form fields
    const pickupName = form.get('pickupName')
    const pickupAddress = form.get('pickupAddress')
    const pickupArea = form.get('pickupArea')
    const pickupPhone = form.get('pickupPhone')

    // Pickup point update form fields
    const pickupId = form.get('pickupId')
    const pickupStatus = form.get('pickupStatus')

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
        case 'updateShopPickup': {
            if (
                typeof pickupId !== 'string' ||
                typeof pickupName !== 'string' ||
                typeof pickupAddress !== 'string' ||
                typeof pickupArea !== 'string' ||
                typeof pickupPhone !== 'string' ||
                typeof pickupStatus !== 'string'
            ) {
                return badRequest({
                    formError: `Form not submitted correctly.`,
                })
            }
            const fields = {
                pickupId,
                pickupName,
                pickupAddress,
                pickupArea,
                pickupPhone,
                pickupStatus,
            }
            const pickupPoint = await updateShopPickUpPoint(request, fields)
            console.log('pickupPoint', pickupPoint)
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
                formSuccess: { message: 'Pickup point update successful' },
            })
        }
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
    } = useDisclosure()
    const {
        onOpen: onEditPickupPointOpen,
        isOpen: isEditPickupPointOpen,
        onClose: onEditPickupPointClose,
    } = useDisclosure({
        // isOpen: true,
    })
    return (
        <Layout>
            <PickupPointProvider>
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
                    <EditPickupPointDrawer
                        actionData={actionData}
                        isOpen={isEditPickupPointOpen}
                        onClose={onEditPickupPointClose}
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
                            onEditDrawerOpen={onEditPickupPointOpen}
                        />
                    )}
                </Container>
            </PickupPointProvider>
        </Layout>
    )
}

export default PickupList
