import type {
    ApiErrorResponse,
    PickupPoints,
    Shop,
    ShopCreateBody,
    Shops,
} from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios'
import { AxiosError } from 'axios'

export const addShop = async (
    request: Request,
    {
        shopName,
        shopEmail,
        shopAddress,
        pickupAddress,
        pickupArea,
        pickupPhone,
        shopProductType,
        shopSubProductType,
    }: ShopCreateBody,
): Promise<Shop | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const createShopRes = await axios.post(
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
        const shop: Shop = createShopRes.data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pickupPointRes = await axios.post(
            `/shops/${shop.id}/pickup-points`,
            {
                name: pickupArea,
                address: pickupAddress,
                area: pickupArea,
                phone: pickupPhone,
                isActive: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        return shop
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

export const getShops = async (
    request: Request,
): Promise<Shops | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const res = await axios.get('/shops', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const shops: Shops = res.data
        return shops
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
// export const getShop = async (id: string) => {}
export const getShopPickUpPoints = async (
    request: Request,
): Promise<PickupPoints | ApiErrorResponse | null> => {
    try {
        const coockies = request.headers.get('cookie')
        if (coockies) {
            const coockiesArray = coockies.split('activeShop')
            const activeShopData = coockiesArray.find((coockie) =>
                coockie.includes('id'),
            )
            if (activeShopData) {
                console.log('activeShopData', activeShopData)
                const shopId = JSON.parse(activeShopData).id
                const access_token = await getUserToken(request)
                const res = await axios.get(`/shops/${shopId}/pickup-points`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                const pickupPoints: PickupPoints = res.data
                return pickupPoints
            }
            return null
        }
        return null
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
// export const getShopPickUpPoint = async ({
//     shopId,
//     pickUpPointId,
// }: {
//     shopId: string
//     pickUpPointId: string
// }) => {}
