import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'

// Get all parcels to pickup
export const getParcelsToPickUp = async (
    request: Request,
): Promise<Parcels | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const parcelsRes = await axios.get(
            '/parcels/packagehandler/to-pickup?shop=true&deliveryArea=true&pickup=true&parcelUser=true',
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

// Get all parcels to deliver
export const getParcelsToDelivery = async (
    request: Request,
): Promise<Parcels | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const parcelsRes = await axios.get(
            '/parcels/packagehandler/to-deliver?shop=true&deliveryArea=true&pickup=true&parcelUser=true',
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

// deliver parcel by a delivery man using parcel number
export const deliverParcelByPackageHandler = async (
    request: Request,
    parcelNumber: string | undefined,
): Promise<Parcel | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const response = await axios.patch(
            `/parcels/packagehandler/delivered/${parcelNumber}`,
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
