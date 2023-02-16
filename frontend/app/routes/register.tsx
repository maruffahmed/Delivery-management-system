import type { MetaFunction } from '@remix-run/node'
import { Form } from '@remix-run/react'
import Input from '~/components/input'

export const meta: MetaFunction = () => ({
    title: 'Register',
})
function login() {
    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">
                        Add your information
                    </h1>
                    <p className="text-white mt-1">
                        Please tell a bit about you and your business
                    </p>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex md:w-1/2 justify-center items-center bg-white overflow-auto overflow-y-scroll">
                <Form className="w-3/4 lg:w-3/4 pt-32 pb-20">
                    <p className="text-gray-700 mt-1 font-bold mb-3">
                        Personal Inforamtion
                    </p>
                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Full Name
                            </span>
                            <Input type="text" placeholder="Maruf Ahmed" />
                        </label>
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Email
                            </span>
                            <Input type="email" placeholder="maruf@gmail.com" />
                        </label>
                    </div>

                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Phone Number
                            </span>
                            <Input type="tel" placeholder="+8801234678910" />
                        </label>
                    </div>

                    <p className="text-gray-700 font-bold mt-6">
                        Shop Information
                    </p>
                    <small className="text-gray-700 mb-3 block">
                        If you have more thant one busines, you can create
                        multiple shops later
                    </small>
                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Shop Name
                            </span>
                            <Input type="text" placeholder="Shop Name" />
                        </label>
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Shop Email
                            </span>
                            <Input type="email" placeholder="Email address" />
                        </label>
                    </div>
                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Shop Address
                            </span>
                            <Input type="text" placeholder="Shop Address" />
                        </label>
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Product Type
                            </span>
                            <select
                                name=""
                                id=""
                                className="block w-full mt-1 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-gray-300"
                            >
                                <option value="">Choose product type</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Product Sub Category Type
                            </span>
                            <select
                                name=""
                                id=""
                                className="block w-full mt-1 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-gray-300"
                            >
                                <option value="">
                                    Choose sub Category type
                                </option>
                            </select>
                        </label>
                    </div>

                    <p className="text-gray-700 font-bold mt-6 mb-3">
                        Create Password
                    </p>
                    <div className="flex justify-between gap-6 mb-3">
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Password
                            </span>
                            <Input
                                type="password"
                                placeholder="Enter Password"
                            />
                        </label>
                        <label className="block text-sm w-full">
                            <span className="text-gray-500 dark:text-gray-400">
                                Confirm Password
                            </span>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </label>
                    </div>

                    {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                    <button
                        type="submit"
                        className="block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Sign up
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default login
