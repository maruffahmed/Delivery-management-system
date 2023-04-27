import { Menu } from '@headlessui/react'
import { Link } from '@remix-run/react'
import { useAuthProvider } from '~/context/AuthProvider'
// import config from "~/config"
import { useThemeProvider } from '~/context/ThemeContext'

// const SERVER_URL = config.SERVER_URL

function Header({
    isSideMenuOpen,
    toggleDarkMode,
    isDarkMode,
}: {
    isSideMenuOpen: Boolean
    toggleDarkMode: Function
    isDarkMode: Boolean
}) {
    const { setIsSideMenuOpen } = useThemeProvider()
    const { name } = useAuthProvider()
    const avatarUrl = '/img/avatar.png'
    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* <!-- Mobile hamburger --> */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    aria-label="Menu"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                {/* <!-- Search input --> */}

                <ul className="flex items-center flex-shrink-0 space-x-6 ml-auto">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none focus:shadow-outline-purple"
                            onClick={() => toggleDarkMode()}
                            aria-label="Toggle color mode"
                        >
                            {isDarkMode ? (
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </li>
                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <Menu>
                            <Menu.Button
                                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                                aria-label="Account"
                                aria-haspopup="true"
                            >
                                <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src={avatarUrl}
                                    alt=""
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                            <Menu.Items
                                as="ul"
                                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                                aria-label="submenu"
                            >
                                <Menu.Item>
                                    <li className="flex">
                                        <p className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md">
                                            <svg
                                                className="w-4 h-4 mr-3"
                                                aria-hidden="true"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            <span>{name}</span>
                                        </p>
                                    </li>
                                </Menu.Item>

                                <Menu.Item>
                                    <li className="flex">
                                        <Link
                                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            type="submit"
                                            to="/admin/logout"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-3"
                                                aria-hidden="true"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                            </svg>
                                            <span>Log out</span>
                                        </Link>
                                    </li>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
