import type { AdminStatistics, ApiErrorResponse } from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all shops
export const getAdminStatistics = async (
    request: Request,
): Promise<AdminStatistics | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const res = await axios.get('/statistics/admin', {
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
