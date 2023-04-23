// User types
export interface UserRoles {
    role: UserRole
}
export interface UserRole {
    id: number
    name: string
    description: string
}
export interface User {
    id: number
    name: string
    email: string
    phone: string
    roles: UserRoles[]
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
    createdAt: string
    updatedAt: string
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
    areaId: number
    phone: string
    isActive: boolean
    shopId: number
    createdAt: string
    updatedAt: string
    area?: Area & {
        district: District & {
            division: Division
        }
    }
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

export interface ServiceZone {
    id: number
    name: string
    parcelPricingId: number
    area: Area[]
    pricing: ParcelPrice
}

// Parcel
export interface ParcelStatus {
    id: number
    name: 'pending' | 'canceled' | 'picked-up' | 'delivered'
    description: string
}

export interface Parcel {
    id: number
    parcelNumber: string
    customerName: string
    customerPhone: string
    customerAddress: string
    customerParcelInvoiceId: string | null
    parcelProductType: string
    parcelProductCategoriesId: number
    parcelExtraInformation: string | null
    parcelStatusId: number
    parcelWeight: number
    parcelCashCollection: number
    parcelPrice: number
    parcelCharge: number
    shopsId: number
    parcelPickUpId: number
    parcelDeliveryAreaId: number
    parcelUserId: number
    createdAt: string
    updatedAt: string
    parcelStatus: ParcelStatus
    parcelPickUp?: PickupPoint
    shop?: Shop
    parcelDeliveryArea?: Area & {
        district: District & {
            division: Division
        }
    }
}
export interface Parcels {
    data: Parcel[]
}
export interface ParcelCreateBody {
    customerName: string
    customerPhone: string
    customerAddress: string
    parcelWeight: number
    parcelDeliveryAreaId: number
    parcelCashCollection: number
    parcelPrice: number
    parcelProductType: string
    parcelProductCategoriesId: number
    parcelPickUpId: number
    parcelCharge: number
    customerParcelInvoiceId?: string
    parcelExtraInformation?: string
}

// Parcel pricing
export interface ParcelPrice {
    id: number
    KG05_PRICE: number
    KG1_PRICE: number
    KG2_PRICE: number
    KG3_PRICE: number
    KG4_PRICE: number
    KG5_PRICE: number
}

export interface ParcelPrices {
    data: ServiceZone[]
}

// Settings
export interface ChangePasswordBody {
    oldPassword: string
    newPassword: string
    confirmPassword: string
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
