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

export interface Shops {
    data: Shop[]
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
