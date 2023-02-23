import type { ApiErrorResponse, Shop, ShopCreateBody, Shops } from '~/types'
import { getUserToken, logout } from '../session.server'
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
): Promise<Shop> => {
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
            throw new Error(error.response?.data)
        }
        throw error
    }
}

export const getShops = async (request: Request): Promise<Shops> => {
    try {
        const access_token = await getUserToken(request)
        // console.log('access_token', access_token)
        const res = await axios.get('/shops', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const shops = res.data
        if ((shops as ApiErrorResponse).statusCode == 401) logout(request)
        return res.data as Shops
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data)
        }
        throw error
    }
}
export const getShop = async (id: string) => {}
export const getShopPickUpPoints = async (shopId: string) => {}
export const getShopPickUpPoint = async ({
    shopId,
    pickUpPointId,
}: {
    shopId: string
    pickUpPointId: string
}) => {}
