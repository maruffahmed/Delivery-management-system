import type { ApiErrorResponse, Parcels, ParcelTimeline } from '~/types'
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

// Get parcel timeline by parcel number
export const getParcelTimelineByParcelNumber = async (
    request: Request,
    parcelNumber: string | null,
): Promise<ParcelTimeline | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const parcelTimelineRes = await axios.get(
            `/parcel-timeline/${parcelNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const parcelTimeline = parcelTimelineRes.data
        return parcelTimeline
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}
