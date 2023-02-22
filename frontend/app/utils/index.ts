import { json } from '@remix-run/node'
import validator from 'validator'

export const classNames = (...classes: (string | undefined | null)[]) => {
    return classes.filter(Boolean).join(' ')
}

export function validateUrl(url: string) {
    let urls = [
        '/dashboard',
        '/products',
        '/products/list',
        '/products/add',
        '/',
        'https://remix.run',
    ]
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
