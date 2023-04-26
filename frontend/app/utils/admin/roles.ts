import type { ApiErrorResponse, UserRole } from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all parcels
export const getUserRoles = async (
    request: Request,
): Promise<{ data: UserRole[] } | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const userRolesRes = await axios.get('/roles', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const userRoles = userRolesRes.data
        return userRoles
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
