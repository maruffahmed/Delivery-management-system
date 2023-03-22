import type {
    ApiErrorResponse,
    Parcel,
    ParcelCreateBody,
    Parcels,
} from '~/types'
import { getUserToken } from '../session.server'
import axios from '~/utils/axios.server'
import { AxiosError } from 'axios'
import { getShopIdFromCookie } from './shops'

// Add a new parcel
export const addParcel = async (
    request: Request,
    {
        customerName,
        customerPhone,
        customerAddress,
        parcelCashCollection,
        parcelWeight,
        parcelCharge,
        parcelPrice,
        parcelDeliveryAreaId,
        parcelPickUpId,
        parcelProductCategoriesId,
        parcelProductType,
    }: ParcelCreateBody,
): Promise<Parcel | ApiErrorResponse | null> => {
    try {
        const shopsId = getShopIdFromCookie(request)
        if (!shopsId) return null

        const access_token = await getUserToken(request)
        const createParcelRes = await axios.post(
            '/parcels',
            {
                customerName,
                customerPhone,
                customerAddress,
                parcelWeight,
                parcelDeliveryAreaId,
                parcelCashCollection,
                parcelPrice,
                parcelProductType,
                parcelProductCategoriesId,
                parcelPickUpId,
                parcelStatusId: 1,
                parcelCharge,
                shopsId,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
        const parcel: Parcel = createParcelRes.data
        return parcel
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

// Get all parcels
export const getParcels = async (
    request: Request,
): Promise<Parcels | ApiErrorResponse | null> => {
    try {
        const access_token = await getUserToken(request)
        const parcelsRes = await axios.get(
            '/parcels?pickup=true&shop=true&deliveryArea=true',
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
