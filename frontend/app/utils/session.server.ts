import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { AxiosError } from 'axios'
import type { ApiErrorResponse, LoginResponse, User } from '~/types'
import axios from '~/utils/axios'

type LoginForm = {
    email: string
    password: string
}

export async function login({
    email,
    password,
}: LoginForm): Promise<LoginResponse | ApiErrorResponse | null> {
    try {
        const res = await axios.post('/auth/login', {
            username: email,
            password,
        })
        const user = res.data
        return user
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
    // return { id: user.id, username }
}

type RegistrationForm = {
    name: string
    email: string
    phone: string
    password: string
    shopName: string
    shopEmail: string
    shopAddress: string
    shopProductType: string
    shopSubProductType: string
}
export async function register(
    regFormData: RegistrationForm,
): Promise<User | ApiErrorResponse | null> {
    const {
        name,
        email,
        phone,
        password,
        shopName,
        shopEmail,
        shopAddress,
        shopProductType,
        shopSubProductType,
    } = regFormData
    try {
        const user = await axios.post('/auth/merchant/register', {
            name,
            email,
            phone,
            password,
            shopName,
            shopEmail,
            shopAddress,
            shopProductType,
            shopSubProductType,
        })
        return user.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        return null
    }
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'DELIVERY_session',
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'number') return null
    return userId
}
export async function getUserToken(request: Request) {
    const session = await getUserSession(request)
    const access_token = session.get('access_token')
    if (!access_token || typeof access_token !== 'string') return null
    return access_token
}
export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname,
) {
    const session = await getUserSession(request)
    // console.log("session ", session)
    const userId = session.get('userId')
    // console.log("userId ", userId)
    if (!userId || typeof userId !== 'number') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }
    return userId
}

export async function getUser(request: Request) {
    const access_token = await getUserToken(request)
    console.log('getUser', access_token)
    if (typeof access_token !== 'string') {
        return null
    }

    try {
        const user = await axios.get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        return user
    } catch {
        throw logout(request)
    }
}

export async function logout(request: Request) {
    const session = await getUserSession(request)
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}

export async function createUserSession(
    userId: number,
    access_token: string,
    redirectTo: string,
) {
    const session = await storage.getSession()
    session.set('userId', userId)
    session.set('access_token', access_token)
    // console.log("session ", session)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}
