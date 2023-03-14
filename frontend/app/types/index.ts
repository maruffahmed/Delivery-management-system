// User types
export interface UserRole {
    id: number
    name: string
    description: string
    type: string
}
export interface User {
    id: number
    name: string
    email: string
    phone: string
}

// Shop
export interface Shop {
    id: number
    name: string
    email: string
    address: string
    productType: string
    productSubType: string
    userId: number
}

export interface ShopCreateBody {
    shopName: string
    shopEmail: string
    shopAddress: string
    pickupAddress: string
    pickupArea: string
    pickupPhone: string
    shopProductType: string
    shopSubProductType: string
}
export interface ShopUpdateBody {
    updateShopId: string
    updateShopName: string
    updateShopEmail: string
    updateShopAddress: string
}

export interface Shops {
    data: Shop[]
}

// Pickup point
export interface PickupPoint {
    id: number
    name: string
    address: string
    area: string
    phone: string
    isActive: boolean
    shopId: number
}

export interface PickupPoints {
    data: PickupPoint[]
}

export interface PickupPointCreateBody {
    pickupName: string
    pickupAddress: string
    pickupArea: string
    pickupPhone: string
}
export interface PickupPointUpdateBody extends PickupPointCreateBody {
    pickupId: string
    pickupStatus: string
}

// product categories
export interface ProductParentCategory {
    id: number
    name: string
    description: string
    childs?: ProductChildCategory[]
}

export interface ProductParentCategories {
    data: ProductParentCategory[]
}

export interface ParcelProductParentCategories {
    data: Pick<ProductParentCategory, 'id' | 'name'>[]
}

export interface ProductChildCategory extends ProductParentCategory {
    parentId: number
}
export interface ProductChildCategories {
    data?: ProductChildCategory[]
}

// Service area

export interface Division {
    id: number
    name: string
    districts?: District[]
}

export interface District {
    id: number
    name: string
    divisionId: number
    areas?: Area[]
}

export interface Area {
    id: number
    name: string
    districtId: number
    zonesId: number
}

export interface ServiceArea {
    data: {
        divisions: Division[]
    }
}

// API responce
export interface LoginResponse {
    access_token: string
    user: User
}

export interface ApiErrorResponse {
    statusCode: number
    message: string
    error: string
}
