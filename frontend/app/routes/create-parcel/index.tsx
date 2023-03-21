import { Button, Container, Grid, GridItem, Spacer } from '@chakra-ui/react'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    Form,
    Link as RemixLink,
    useActionData,
    useLoaderData,
} from '@remix-run/react'
import React from 'react'
import { useQuery } from 'react-query'
import Layout from '~/components/Layout'
import ParcelInfoInputs from '~/components/merchant/create-parcel/ParcelInfoInputs'
import ShopAndParcelInfo from '~/components/merchant/create-parcel/ShopAndParcelInfo'
import type { ApiErrorResponse, PickupPoints } from '~/types'
import { badRequest } from '~/utils'
import { getParcelProductParentCateogires } from '~/utils/merchant/CSR_API'
import { getShopPickUpPoints } from '~/utils/merchant/shops'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
    title: 'Create new parcel',
})

export type LoaderData = {
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
        }
    } else if (!pickupPoints) {
        return {
            error: 'Something is wrong. Please reload the browser.',
            pickupPoints: { data: [] },
        }
    }
    return { pickupPoints }
}

export type CreateParcelActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {}
    fields?: {
        customerName?: string
        customerPhone?: string
        customerAddress?: string
        customerParcelInvoiceId?: string
        percelWeight?: string
        parcelDeliveryArea?: string
        parcelCashCollection?: string
        percelPrice?: string
        parcelProductType?: string
        parcelProductCategory?: string
        parcelExtraInformation?: string
        parcelPickUpId?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()

    // Parcel fields
    const customerName = form.get('customerName')
    const customerPhone = form.get('customerPhone')
    const customerAddress = form.get('customerAddress')
    const customerParcelInvoiceId = form.get('customerParcelInvoiceId')
    const percelWeight = form.get('percelWeight')
    const parcelDeliveryArea = form.get('parcelDeliveryArea')
    const parcelCashCollection = form.get('parcelCashCollection')
    const percelPrice = form.get('percelPrice')
    const parcelProductType = form.get('parcelProductType')
    const parcelProductCategory = form.get('parcelProductCategory')
    const parcelExtraInformation = form.get('parcelExtraInformation')
    const parcelPickUpId = form.get('parcelPickUpId')

    if (
        typeof customerName !== 'string' ||
        typeof customerPhone !== 'string' ||
        typeof customerAddress !== 'string' ||
        typeof customerParcelInvoiceId !== 'string' ||
        typeof percelWeight !== 'string' ||
        typeof parcelDeliveryArea !== 'string' ||
        typeof parcelCashCollection !== 'string' ||
        typeof percelPrice !== 'string' ||
        typeof parcelProductType !== 'string' ||
        typeof parcelProductCategory !== 'string' ||
        typeof parcelExtraInformation !== 'string' ||
        typeof parcelPickUpId !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        customerName,
        customerPhone,
        customerAddress,
        customerParcelInvoiceId,
        percelWeight,
        parcelDeliveryArea,
        parcelCashCollection,
        percelPrice,
        parcelProductType,
        parcelProductCategory,
        parcelExtraInformation,
        parcelPickUpId,
    }
    const fieldErrors = {}
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    // const shop = await addShop(request, fields)
    // if (shop && (shop as ApiErrorResponse).message) {
    //     return badRequest({
    //         formError: (shop as ApiErrorResponse).message,
    //     })
    // } else if (!shop) {
    //     return badRequest({
    //         formError: `Something went wrong. Please try again.`,
    //     })
    // }

    return json({
        formSuccess: { message: 'Shop created successful' },
        data: fields,
    })
}

function CreateParcel() {
    const { pickupPoints } = useLoaderData<LoaderData>()
    const actionData = useActionData<CreateParcelActionData>()
    const { data: parcelProductParentCat } = useQuery({
        queryKey: 'parcelProductParentCategories',
        queryFn: () => getParcelProductParentCateogires(),
    })
    const [checkCondition, setCheckCondition] = React.useState<boolean>(false)

    console.log('actionData', actionData)
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Form method="post">
                    <Grid templateColumns="repeat(6, 1fr)" gap={5}>
                        {/* Percel input form */}
                        <ParcelInfoInputs
                            parcelProductParentCat={parcelProductParentCat}
                            setCheckCondition={setCheckCondition}
                        />

                        {/* Shops and percel information */}
                        <ShopAndParcelInfo
                            actionData={actionData}
                            pickupPoints={pickupPoints}
                        />
                        {/* Action buttons */}
                        <GridItem
                            colSpan={{ base: 6, lg: 4 }}
                            display="flex"
                            py={5}
                        >
                            <Button
                                colorScheme="primary"
                                variant="outline"
                                size="lg"
                                as={RemixLink}
                                to="/"
                            >
                                Cancel
                            </Button>
                            <Spacer />
                            <Button
                                colorScheme="primary"
                                size="lg"
                                isDisabled={!checkCondition}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </GridItem>
                    </Grid>
                </Form>
            </Container>
        </Layout>
    )
}

export default CreateParcel
