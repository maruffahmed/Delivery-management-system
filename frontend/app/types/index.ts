export interface Category {
    id: number
    attributes: {
        name: string
        products?: ProductType
    }
}
export interface Categories {
    data: Category[]
}

export interface ProductImageFormatProperties {
    name: string
    hash: string
    ext: string
    mime: string
    path: string
    width: number
    height: number
    size: number
    url: string
}

export interface ProductImageFormat {
    thumbnail: ProductImageFormatProperties
    medium: ProductImageFormatProperties
    small: ProductImageFormatProperties
}
export interface ProductImage {
    data: {
        id: number
        attributes: {
            name: string
            width: number
            height: number
            formats: ProductImageFormat
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: string
            provider: string
        }
    }
}
export interface ProductStoreProperties {
    id: number
    attributes: {
        name: string
        address: string
        products?: ProductType
    }
}
export interface ProductStore {
    data: ProductStoreProperties
}

export interface ProductStores {
    data: ProductStoreProperties[]
}

export interface Product {
    id: number
    attributes: {
        name: string
        price: number
        quantity: number
        description: string
        categories: Categories
        image: ProductImage
        store: ProductStore
    }
}
export interface ProductType {
    data: Product[]
}

// User types
export interface UserRole {
    id: number
    name: string
    description: string
    type: string
}
export interface UserAvatarFormatProperties {
    name: string
    hash: string
    ext: string
    mime: string
    path: null
    width: number
    height: number
    size: number
    url: string
}
export interface UserAvatarFormats {
    thumbnail: UserAvatarFormatProperties
    small: UserAvatarFormatProperties
}
export interface UserAvatar {
    id: number
    name: string
    width: number
    height: number
    formats: UserAvatarFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
}
export interface User {
    id: number
    username: string
    email: string
    confirmed: boolean
    blocked: boolean
    role: UserRole
    avatar: UserAvatar
}

export interface Sale {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        quantity: number
        product: {
            data: Product
        }
    }
}
export interface Sales {
    data: Sale[]
}
