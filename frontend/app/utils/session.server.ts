import { createCookieSessionStorage, redirect } from '@remix-run/node'
import axios from 'axios'

type LoginForm = {
    email: string
    password: string
}

export async function login({ email, password }: LoginForm) {
    try {
        const res = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: email,
            password,
        })
        const user = res.data
        // console.log("user ", user)
        if (!user) return null

        return user
    } catch (error) {
        return null
    }
    // return { id: user.id, username }
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RJ_session',
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
export async function getUserJwt(request: Request) {
    const session = await getUserSession(request)
    const jwt = session.get('jwt')
    if (!jwt || typeof jwt !== 'string') return null
    return jwt
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
    const jwt = await getUserJwt(request)
    if (typeof jwt !== 'string') {
        return null
    }

    try {
        const user = await axios.get(
            `http://localhost:1337/api/users/me?populate=role,avatar`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        )
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
    userId: string,
    jwt: string,
    redirectTo: string,
) {
    const session = await storage.getSession()
    session.set('userId', userId)
    session.set('jwt', jwt)
    // console.log("session ", session)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}
