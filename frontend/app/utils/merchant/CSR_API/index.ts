import type { ProductParentCategories, ServiceArea } from '~/types'
import axios from 'axios'
import config from '~/config'

export const getShopParentCategories = (): Promise<ProductParentCategories> => {
    return axios.get(
        `${config.API_BASE_URL}/shop-product-categories/parent?child=true`,
    )
}

export const getServiceAreaTree = (): Promise<ServiceArea> => {
    return axios.get(`${config.API_BASE_URL}/service-area/tree`)
}
