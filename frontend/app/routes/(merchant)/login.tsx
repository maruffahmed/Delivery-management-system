import React from 'react'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import type { ApiErrorResponse, LoginResponse } from '~/types'
import { redirect } from '@remix-run/node'
import { useActionData, useSearchParams, useTransition } from '@remix-run/react'
import LoginRegLeftSide from '~/components/common/loginRegLeftSide'
import { createUserSession, getUserId, login } from '~/utils/session.server'
import {
    badRequest,
    validateEmail,
    validatePassword,
    validateUrl,
} from '~/utils'
import LoginForm from '~/components/merchant/LoginForm'
import Layout from '~/components/Layout'
import { useShopProvider } from '~/context/ShopProvider'

export const meta: MetaFunction = () => ({
    title: 'Login',
})

export type ActionData = {
    formError?: string
    fieldErrors?: {
        email?: string | undefined
        password?: string | undefined
    }
    fields?: {
        email?: string
        password?: string
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const email = form.get('email')
    const password = form.get('password')
    const redirectTo = validateUrl(
        (form.get('redirectTo') as string) || '/dashboard',
    )
    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof redirectTo !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = { email, password }
    const fieldErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    }
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    const user = await login({ email, password })
    if (user && (user as ApiErrorResponse).message) {
        return badRequest({
            fields,
            formError: (user as ApiErrorResponse).message,
        })
    } else if (!user) {
        return badRequest({
            fields,
            formError: 'Something is wrong! Please try again.',
        })
    }
    return createUserSession(
        (user as LoginResponse).user.id,
        (user as LoginResponse).access_token,
        (user as LoginResponse).user.roles[0].role.name,
        redirectTo,
    )
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (userId) {
        return redirect('/dashboard')
    }
    return null
}

export default function Login() {
    const actionData = useActionData<ActionData>()
    const [searchParams] = useSearchParams()
    const transition = useTransition()
    const { resetShopProvider } = useShopProvider()

    React.useEffect(() => {
        resetShopProvider()
        console.log('resetShopProvider')
    }, [resetShopProvider])
    return (
        <Layout>
            <div className="h-screen md:flex">
                <LoginRegLeftSide
                    title="Welcome!"
                    subtitle="Enter your email and password to login to the dashboard"
                />

                <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                    <LoginForm
                        actionData={actionData}
                        searchParams={searchParams}
                        transition={transition}
                    />
                </div>
            </div>
        </Layout>
    )
}
