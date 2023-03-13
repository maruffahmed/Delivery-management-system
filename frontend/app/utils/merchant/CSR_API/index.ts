import type { ProductParentCategories, ServiceArea } from '~/types'
import axios from 'axios'
import config from '~/config'

export const getShopParentCategories = (
    access_token: string,
): Promise<ProductParentCategories> => {
    return axios.get(
        `${config.API_BASE_URL}/shop-product-categories/parent?child=true`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
}

export const getServiceAreaTree = (
    access_token: string,
): Promise<ServiceArea> => {
    return axios.get(`${config.API_BASE_URL}/service-area/tree`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}
