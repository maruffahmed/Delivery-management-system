import type {
    ApiErrorResponse,
    FieldPackageHandler,
    FieldPackageHandlerBody,
    FieldPackageHandlers,
    FieldPackageHandlerUpdateBody,
} from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all field package handlers
export const getFieldPackageHandlers = async (
    request: Request,
): Promise<FieldPackageHandlers | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const packageHandlersRes = await axios.get('/filed-package-handlers', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const packageHandlers = packageHandlersRes.data
        return packageHandlers
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Get a field package handler with field package handler ID
export const getFieldPackageHandlerById = async (
    request: Request,
    id: string | undefined,
): Promise<FieldPackageHandler | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.get(`/filed-package-handlers/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const resData = response.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Add a new field
export const addFieldPackageHandler = async (
    request: Request,
    {
        name,
        email,
        phone,
        password,
        address,
        areaId,
        roleId,
    }: FieldPackageHandlerBody,
): Promise<FieldPackageHandlers | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const createRes = await axios.post(
            '/filed-package-handlers',
            {
                name,
                email,
                phone,
                password,
                address,
                areaId,
                roleId,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const resData: FieldPackageHandlers = createRes.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// update a new field package handler
export const updateFieldPackageHandler = async (
    request: Request,
    id: string | undefined,
    {
        name,
        email,
        phone,
        password,
        address,
        areaId,
        roleId,
    }: FieldPackageHandlerBody,
): Promise<FieldPackageHandlers | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.patch(
            `/filed-package-handlers/${id}`,
            {
                name,
                email,
                phone,
                password,
                address,
                areaId,
                roleId,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const resData: FieldPackageHandlers = response.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
