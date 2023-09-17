import type { UserRole } from '~/types'
import axios from 'axios'

declare let window: any
const baseURL = typeof window !== 'undefined' && window.ENV.API_BASE_URL
const configAxios = axios.create({
    baseURL,
})

export const getUserRolesClient = (
    areaId: number | undefined,
    roleName?: string,
    userToken?: string,
): Promise<{
    data: {
        data: UserRole[]
    }
}> => {
    return configAxios.get(
        `/filed-package-handlers?areaId=${areaId}&${
            roleName ? `roleName=${roleName}` : ''
        }`,
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        },
    )
}
