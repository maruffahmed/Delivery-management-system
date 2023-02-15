import type { MetaFunction } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'

export const meta: MetaFunction = () => ({
    title: 'Login',
})
function login() {
    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">
                        Welcome!
                    </h1>
                    <p className="text-white mt-1">
                        Enter your email and password to login to the dashboard
                    </p>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <Form className="w-3/4 lg:w-2/4">
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Email
                        </span>
                        <input
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="jane@gmail.com"
                        />
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Password
                        </span>
                        <input
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="***************"
                            type="password"
                        />
                    </label>

                    {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                    <button
                        type="submit"
                        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Log in
                    </button>

                    <hr className="my-8" />

                    <p className="mt-4">
                        <Link
                            to="/"
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </p>
                    <p className="mt-1">
                        <Link
                            to="/"
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            Create account
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default login
