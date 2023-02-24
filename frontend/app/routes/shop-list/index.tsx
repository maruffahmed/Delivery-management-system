import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Container,
    Heading,
    useDisclosure,
} from '@chakra-ui/react'
import { useActionData, useLoaderData } from '@remix-run/react'
import ShopListGrid from '~/components/merchant/shop-list/ShopListGrid'
import { badRequest, validateEmail } from '~/utils'
import AddShopDrawer from '~/components/merchant/shop-list/AddShopDrawer'
import type { ApiErrorResponse, Shop, Shops } from '~/types'
import { addShop, getShops, updateShop } from '~/utils/merchant/shops'
import EditShopDrawer from '~/components/merchant/shop-list/EditShopDrawer'

export const meta: MetaFunction = () => ({
    title: 'Shop list',
})

export type ShopLoaderData = {
    shops: Shops
    error?: string
}
export const loader: LoaderFunction = async ({
    request,
}): Promise<ShopLoaderData> => {
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

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
        shop: Shop
    }
    fieldErrors?: {
        shopEmail?: string | undefined
        updateShopEmail?: string | undefined
    }
    fields?: {
        shopName?: string
        shopEmail?: string
        shopAddress?: string
        pickupAddress?: string
        pickupArea?: string
        pickupPhone?: string
        shopProductType?: string
        shopSubProductType?: string
        updateShopId?: string
        updateShopName?: string
        updateShopEmail?: string
        updateShopAddress?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get('_action')

    // Shop add form fields
    const shopName = form.get('shopName')
    const shopEmail = form.get('shopEmail')
    const shopAddress = form.get('shopAddress')
    const pickupAddress = form.get('pickupAddress')
    const pickupArea = form.get('pickupArea')
    const pickupPhone = form.get('pickupPhone')
    const shopProductType = form.get('productType')
    const shopSubProductType = form.get('subProductType')

    // Shop edit form fields
    const updateShopId = form.get('updateShopId')
    const updateShopName = form.get('updateShopName')
    const updateShopEmail = form.get('updateShopEmail')
    const updateShopAddress = form.get('updateShopAddress')

    switch (action) {
        case 'addShop': {
            if (
                typeof shopName !== 'string' ||
                typeof shopEmail !== 'string' ||
                typeof shopAddress !== 'string' ||
                typeof pickupAddress !== 'string' ||
                typeof pickupArea !== 'string' ||
                typeof pickupPhone !== 'string' ||
                typeof shopProductType !== 'string' ||
                typeof shopSubProductType !== 'string'
            ) {
                return badRequest({
                    formError: `Form not submitted correctly.`,
                })
            }

            const fields = {
                shopName,
                shopEmail,
                shopAddress,
                pickupAddress,
                pickupArea,
                pickupPhone,
                shopProductType,
                shopSubProductType,
            }
            const fieldErrors = {
                shopEmail: validateEmail(shopEmail),
            }
            if (Object.values(fieldErrors).some(Boolean))
                return badRequest({ fieldErrors, fields })

            const shop = await addShop(request, fields)
            if (shop && (shop as ApiErrorResponse).message) {
                return badRequest({
                    formError: (shop as ApiErrorResponse).message,
                })
            } else if (!shop) {
                return badRequest({
                    formError: `Something went wrong. Please try again.`,
                })
            }

            return json({
                formSuccess: { message: 'Shop created successful', shop },
            })
        }
        case 'editShop': {
            if (
                typeof updateShopId !== 'string' ||
                typeof updateShopName !== 'string' ||
                typeof updateShopEmail !== 'string' ||
                typeof updateShopAddress !== 'string'
            ) {
                return badRequest({
                    formError: `Form not submitted correctly.`,
                })
            }
            const fields = {
                updateShopId,
                updateShopName,
                updateShopEmail,
                updateShopAddress,
            }
            const fieldErrors = {
                updateShopEmail: validateEmail(updateShopEmail),
            }
            if (Object.values(fieldErrors).some(Boolean))
                return badRequest({ fieldErrors, fields })

            const shop = await updateShop(request, fields)
            if (shop && (shop as ApiErrorResponse).message) {
                return badRequest({
                    formError: (shop as ApiErrorResponse).message,
                })
            } else if (!shop) {
                return badRequest({
                    formError: `Something went wrong. Please try again.`,
                })
            }

            return json({
                formSuccess: { message: 'Shop edit successful', shop },
            })
        }
        default:
            return badRequest({ formError: `Form not submitted correctly.` })
    }
}

function Index() {
    const { shops, error } = useLoaderData<ShopLoaderData>()
    const actionData = useActionData<ActionData>()
    const {
        isOpen: isAddShopDrawerOpen,
        onOpen: onAddShopDrawerOpen,
        onClose: onAddShopDrawerClose,
    } = useDisclosure()

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Container maxW="container.xl" py="8">
            <Heading
                as="h3"
                fontSize="3xl"
                pb="6"
                borderBottom="4px"
                borderColor="primary.500"
                display="inline-block"
            >
                My Shops
            </Heading>
            <AddShopDrawer
                isOpen={isAddShopDrawerOpen}
                onClose={onAddShopDrawerClose}
                actionData={actionData}
            />
            <EditShopDrawer
                isOpen={isOpen}
                onClose={onClose}
                actionData={actionData}
            />
            {/* Shop list grid */}
            {error ? (
                <Alert status="error" variant="left-accent" my="5">
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <ShopListGrid
                    shops={shops}
                    onAddShopDrawerOpen={onAddShopDrawerOpen}
                    onEditDrawerOpen={onOpen}
                />
            )}
        </Container>
    )
}

export default Index
