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
