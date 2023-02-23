import type { ApiErrorResponse, Shops } from '~/types'
import { getUserToken, logout } from '../session.server'
import axios from '~/utils/axios'
import { AxiosError } from 'axios'

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
