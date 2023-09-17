import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'
import type { ApiErrorResponse, ChangePasswordBody, User } from '~/types'

export const changePassword = async (
    request: Request,
    { oldPassword, newPassword, confirmPassword }: ChangePasswordBody,
): Promise<User | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const changePasswordRes = await axios.patch(
            '/change-password/merchant',
            {
                oldPassword,
                newPassword,
                confirmPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        return changePasswordRes.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
