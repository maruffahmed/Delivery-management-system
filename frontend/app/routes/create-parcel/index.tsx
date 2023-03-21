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
import { addParcel } from '~/utils/merchant/parcels'
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
        parcelWeight?: number
        parcelDeliveryAreaId?: number
        parcelCashCollection?: string
        parcelPrice?: number
        parcelProductType?: string
        parcelProductCategoriesId?: number
        parcelExtraInformation?: string
        parcelPickUpId?: number
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()

    // Parcel fields
    const customerName = form.get('customerName')
    const customerPhone = form.get('customerPhone')
    const customerAddress = form.get('customerAddress')
    const customerParcelInvoiceId = form.get('customerParcelInvoiceId')
    const parcelWeight = form.get('parcelWeight')
    const parcelDeliveryAreaId = form.get('parcelDeliveryAreaId')
    const parcelCashCollection = form.get('parcelCashCollection')
    const parcelPrice = form.get('parcelPrice')
    const parcelProductType = form.get('parcelProductType')
    const parcelProductCategoriesId = form.get('parcelProductCategoriesId')
    const parcelExtraInformation = form.get('parcelExtraInformation')
    const parcelPickUpId = form.get('parcelPickUpId')

    //more
    // const parcelStatusId = form.get('parcelStatusId')
    // const parcelCharge = form.get('parcelCharge')
    // const shopId = form.get('shopId')
    // const parcelUserId = form.get('parcelUserId')

    if (
        typeof customerName !== 'string' ||
        typeof customerPhone !== 'string' ||
        typeof customerAddress !== 'string' ||
        typeof customerParcelInvoiceId !== 'string' ||
        typeof parcelWeight !== 'string' ||
        typeof parcelDeliveryAreaId !== 'string' ||
        typeof parcelCashCollection !== 'string' ||
        typeof parcelPrice !== 'string' ||
        typeof parcelProductType !== 'string' ||
        typeof parcelProductCategoriesId !== 'string' ||
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
        parcelWeight: Number(parcelWeight),
        parcelDeliveryAreaId: Number(parcelDeliveryAreaId),
        parcelCashCollection: Number(parcelCashCollection),
        parcelPrice: Number(parcelPrice),
        parcelProductType,
        parcelProductCategoriesId: Number(parcelProductCategoriesId),
        parcelExtraInformation,
        parcelPickUpId: Number(parcelPickUpId),
    }
    const fieldErrors = {}
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    const newParcel = await addParcel(request, { ...fields, parcelCharge: 0 })
    if (newParcel && (newParcel as ApiErrorResponse).message) {
        return badRequest({
            formError: (newParcel as ApiErrorResponse).message,
        })
    } else if (!newParcel) {
        return badRequest({
            formError: `Something went wrong. Please try again.`,
        })
    }

    return json({
        formSuccess: { message: 'Parcel created successful' },
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

    const formRef = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        if (!formRef.current) return
        if (actionData?.formSuccess) {
            formRef.current.reset()
        }
    }, [actionData?.formSuccess])

    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Form method="post" ref={formRef}>
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
