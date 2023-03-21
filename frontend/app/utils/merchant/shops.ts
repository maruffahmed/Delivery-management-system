import type {
    ApiErrorResponse,
    PickupPoint,
    PickupPointCreateBody,
    PickupPoints,
    PickupPointUpdateBody,
    Shop,
    ShopCreateBody,
    Shops,
    ShopUpdateBody,
} from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Add a new shop
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

// Update a existing shop with shop ID
export const updateShop = async (
    request: Request,
    {
        updateShopId,
        updateShopName,
        updateShopEmail,
        updateShopAddress,
    }: ShopUpdateBody,
): Promise<Shop | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const shopUpdateres = await axios.patch(
            `/shops/${updateShopId}`,
            {
                name: updateShopName,
                email: updateShopEmail,
                address: updateShopAddress,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const shop: Shop = shopUpdateres.data
        return shop
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Get all shops
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

// Utils : Get shop ID from cookie
export const getShopIdFromCookie = (request: Request): string | null => {
    const coockies = request.headers.get('cookie')
    // console.log('coockies, ', coockies)
    if (coockies) {
        const coockiesArray = coockies.split('activeShop')
        const activeShopData = coockiesArray.find((coockie) =>
            coockie.includes('userId'),
        )
        if (activeShopData) {
            // console.log('activeShopData', activeShopData)
            const shopId = JSON.parse(activeShopData).id
            return shopId
        }
        return null
    }
    return null
}

// Get shops pickup points by shop ID
export const getShopPickUpPoints = async (
    request: Request,
): Promise<PickupPoints | ApiErrorResponse | null> => {
    try {
        const shopId = getShopIdFromCookie(request)
        if (!shopId) return null

        const access_token = await getUserToken(request)
        const res = await axios.get(`/shops/${shopId}/pickup-points`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const pickupPoints: PickupPoints = res.data
        return pickupPoints
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Add new shops pickup point by shop ID
export const addShopPickUpPoint = async (
    request: Request,
    {
        pickupName,
        pickupAddress,
        pickupArea,
        pickupPhone,
    }: PickupPointCreateBody,
): Promise<PickupPoint | ApiErrorResponse | null> => {
    try {
        const shopId = getShopIdFromCookie(request)
        if (!shopId) return null

        const access_token = await getUserToken(request)
        const res = await axios.post(
            `/shops/${shopId}/pickup-points`,
            {
                name: pickupName,
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
        const pickupPoint: PickupPoint = res.data
        return pickupPoint
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Update pickup point
export const updateShopPickUpPoint = async (
    request: Request,
    {
        pickupId,
        pickupName,
        pickupAddress,
        pickupArea,
        pickupPhone,
        pickupStatus,
    }: PickupPointUpdateBody,
): Promise<PickupPoint | ApiErrorResponse | null> => {
    try {
        const shopId = getShopIdFromCookie(request)
        if (!shopId) return null

        console.log(`/shops/${shopId}/pickup-points/${pickupId}`, {
            shopId,
            pickupId,
            pickupName,
            pickupAddress,
            pickupArea,
            pickupPhone,
            pickupStatus,
        })

        const access_token = await getUserToken(request)
        const res = await axios.patch(
            `/shops/${shopId}/pickup-points/${pickupId}`,
            {
                name: pickupName,
                address: pickupAddress,
                area: pickupArea,
                phone: pickupPhone,
                isActive: pickupStatus === 'active' ? true : false,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const pickupPoint: PickupPoint = res.data
        return pickupPoint
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('pickupPoint', error.response?.data)
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
