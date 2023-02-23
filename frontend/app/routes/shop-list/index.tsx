import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { Container, Heading, Text, useDisclosure } from '@chakra-ui/react'
import { getUserToken } from '~/utils/session.server'
import axios from '~/utils/axios'
import { useActionData, useLoaderData } from '@remix-run/react'
import ShopListGrid from '~/components/merchant/shop-list/ShopListGrid'
import { badRequest, validateEmail } from '~/utils'
import AddShopDrawer from '~/components/merchant/shop-list/AddShopDrawer'
import type { Shops } from '~/types'
import { getShops } from '~/utils/merchant/shops'

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
    try {
        const shops = await getShops(request)
        return { shops }
    } catch (error) {
        return {
            error: 'Something is wrong. Please reload the browser.',
            shops: { data: [] },
        } as ShopLoaderData
    }
}

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {
        shopEmail?: string | undefined
    }
    fields?: {
        shopName?: string
        shopEmail?: string
        shopAddress?: string
        shopProductType?: string
        shopSubProductType?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const access_token = await getUserToken(request)
    const form = await request.formData()
    const shopName = form.get('shopName')
    const shopEmail = form.get('shopEmail')
    const shopAddress = form.get('shopAddress')
    const shopProductType = form.get('productType')
    const shopSubProductType = form.get('subProductType')
    if (
        typeof shopName !== 'string' ||
        typeof shopEmail !== 'string' ||
        typeof shopAddress !== 'string' ||
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
        shopProductType,
        shopSubProductType,
    }
    const fieldErrors = {
        shopEmail: validateEmail(shopEmail),
    }
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const shops = await axios.post(
        '/shops',
        {
            name: shopName,
            email: shopEmail,
            address: shopAddress,
            productType: shopProductType,
            productSubType: shopSubProductType,
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
    return json({
        formSuccess: { message: 'Shop created successful' },
        shops: shops.data,
    })
}

function Index() {
    const { shops, error } = useLoaderData<ShopLoaderData>()
    const actionData = useActionData<ActionData>()
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
                My Shop(s)
            </Heading>
            <AddShopDrawer
                isOpen={isOpen}
                onClose={onClose}
                actionData={actionData}
            />
            {/* Shop list grid */}
            {error ? (
                <Text color="primary.500" mt="5">
                    {error}
                </Text>
            ) : (
                <ShopListGrid shops={shops} onOpen={onOpen} />
            )}
        </Container>
    )
}

export default Index
