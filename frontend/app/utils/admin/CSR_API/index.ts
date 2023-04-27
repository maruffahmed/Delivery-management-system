import type { UserRole } from '~/types'
import axios from 'axios'
import config from '~/config'

const configAxios = axios.create({
    baseURL: config.API_BASE_URL,
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
