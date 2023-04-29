import type { ApiErrorResponse, Shops } from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all shops
export const getShopsByAdmin = async (
    request: Request,
): Promise<Shops | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const res = await axios.get('/shops/all', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const resData = res.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
