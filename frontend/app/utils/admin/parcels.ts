import type {
    ApiErrorResponse,
    Parcel,
    ParcelAsssignPackageHandlerBody,
    Parcels,
    ParcelUpadteBody,
} from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all parcels
export const getParcelsForAdmin = async (
    request: Request,
): Promise<Parcels | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const parcelsRes = await axios.get(
            '/parcels/all?shop=true&deliveryArea=true',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const parcels = parcelsRes.data
        return parcels
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Get all parcel by parcel number
export const getParcelsForAdminByParcelNumber = async (
    request: Request,
    parcelNumber: string | undefined,
): Promise<Parcel | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.get(
            `/parcels/${parcelNumber}?deliveryArea=true`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const resData = response.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Update a single parcel by parcel number
export const updateParcelForAdminByParcelNumber = async (
    request: Request,
    parcelNumber: string | undefined,
    data: ParcelUpadteBody,
): Promise<Parcel | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.patch(`/parcels/${parcelNumber}`, data, {
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

// Assing field package handler to a parcel
export const assignFieldPackageHandlerToParcel = async (
    request: Request,
    data: ParcelAsssignPackageHandlerBody,
): Promise<Parcel | ApiErrorResponse | null> => {
    const { parcelNumber, handlerType, handlerId } = data
    try {
        const access_token = await getUserToken(request)
        const response = await axios.patch(
            `/parcels?parcelNumber=${parcelNumber}&handlerType=${handlerType}&handlerId=${handlerId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const resData = response.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// receive parcel by admin using parcel number
export const receiveParcelByAdmin = async (
    request: Request,
    parcelNumber: string | undefined,
): Promise<Parcel | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.patch(
            `/parcels/admin/receive/${parcelNumber}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const resData = response.data
        return resData
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
