import { json } from '@remix-run/node'
import validator from 'validator'
import type { ParcelPrices } from '~/types'

export const classNames = (...classes: (string | undefined | null)[]) => {
    return classes.filter(Boolean).join(' ')
}

export function validateUrl(url: string) {
    let urls = ['/', '/dashboard', '/admin', '/admin/dashboard']
    if (urls.includes(url)) {
        return url
    }
    return '/dashboard'
}

export function validateEmail(email: unknown) {
    if (typeof email !== 'string' || !validator.isEmail(email)) {
        return `Invalid email address`
    }
}

export function validatePassword(password: unknown) {
    if (typeof password !== 'string' || password.length < 6) {
        return `Passwords must be at least 6 characters long`
    }
}

export const badRequest = (data: any) => json(data, { status: 400 })

export const calculateDeliveryCharge = ({
    weight,
    zoneId,
    parcelPrices,
}: {
    weight: number
    zoneId: number
    parcelPrices: ParcelPrices
}) => {
    if (!zoneId) return 0
    const charge = parcelPrices.data.find((item) => item.id === zoneId)
    if (!charge) return 0
    if (weight <= 500) return charge.pricing.KG05_PRICE
    if (weight <= 1000) return charge.pricing.KG1_PRICE
    if (weight <= 2000) return charge.pricing.KG2_PRICE
    if (weight <= 3000) return charge.pricing.KG3_PRICE
    if (weight <= 4000) return charge.pricing.KG4_PRICE
    if (weight <= 5000) return charge.pricing.KG5_PRICE
    return Math.round((charge.pricing.KG5_PRICE / 5000) * weight)
}
