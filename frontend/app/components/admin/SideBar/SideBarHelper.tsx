import { Disclosure } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard, MdPointOfSale } from 'react-icons/md'
import { BsFileEarmarkBarGraph } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { classNames } from '~/utils'
// import { useAuthProvider } from '~/context/AuthProvider'

export interface SideBarMenuChildType {
    name: string
    url: string
}

export interface SideBarMenuType {
    name: string
    url: string
    icon: React.ReactNode
    children?: Array<SideBarMenuChildType>
}
export const sideBarMenus = [
    {
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: <MdOutlineSpaceDashboard size="1.2rem" />,
    },
    {
        name: 'Parcel requests',
        url: '/admin/parcel-requests',
        icon: <BsFileEarmarkBarGraph size="1.2rem" />,
    },
    {
        name: 'Field handlers',
        url: '/sales/all',
        icon: <TbTruckDelivery size="1.2rem" />,
        children: [
            {
                name: 'Handler list',
                url: '/admin/package-handlers/list',
            },
            {
                name: 'Add new',
                url: '/admin/package-handlers/add-new',
            },
        ],
    },
    {
        name: 'Sales',
        url: '/sales/all',
        icon: <MdPointOfSale size="1.2rem" />,
        children: [
            {
                name: 'Sales list',
                url: '/sales/all',
            },
            {
                name: 'Add new sale',
                url: '/sales/add',
            },
        ],
    },
]

// Side bar menu item
export function SideBarMenuItem({ item }: { item: SideBarMenuType }) {
    // const { role } = useAuthProvider()
    // if (
    //     item.name == 'Products' &&
    //     role?.name !== 'Admin' &&
    //     role?.name !== 'Moderator'
    // )
    //     return null
    // if (
    //     item.name == 'Categories' &&
    //     role?.name !== 'Admin' &&
    //     role?.name !== 'Moderator'
    // )
    //     return null
    // if (item.name == 'Stores' && role?.name !== 'Admin') return null
    // if (
    //     item.name == 'Sales' &&
    //     role?.name !== 'Admin' &&
    //     role?.name !== 'Seller'
    // )
    //     return null
    // if (
    //     item.name == 'Sales Report' &&
    //     role?.name !== 'Admin' &&
    //     role?.name !== 'Seller'
    // )
    //     return null
    return (
        <li className="relative px-6 py-3">
            {item.children ? (
                <>
                    <Disclosure defaultOpen>
                        <Disclosure.Button
                            aria-label="sidebar-parent-menu"
                            className="w-full inline-flex items-center text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <span className="inline-flex items-center">
                                {item.icon}
                            </span>
                            <span className="ml-4">{item.name}</span>
                            <svg
                                className="w-4 h-4 ml-auto"
                                aria-hidden="true"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
                                {item.children.map((child, i) => (
                                    <li
                                        key={i}
                                        className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                        aria-label="submenu"
                                    >
                                        <NavLink
                                            className={({ isActive }) =>
                                                classNames(
                                                    'w-full',
                                                    isActive
                                                        ? 'text-gray-800 dark:text-gray-100'
                                                        : null,
                                                )
                                            }
                                            to={child.url}
                                        >
                                            {child.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </Disclosure.Panel>
                    </Disclosure>
                </>
            ) : (
                <NavLink
                    className={({ isActive }) =>
                        classNames(
                            'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ',
                            isActive
                                ? 'text-gray-800 dark:text-gray-100'
                                : null,
                        )
                    }
                    to={item.url}
                    end
                    aria-label="sidebar-parent-menu"
                >
                    {({ isActive }) => (
                        <>
                            {isActive ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                        </>
                    )}
                </NavLink>
            )}
        </li>
    )
}

// For E2E testing
const sideBarMenusSize = sideBarMenus.length
const sideBarMenusTotalSize = sideBarMenus.reduce(
    (acc, cur) =>
        acc +
        (cur.children && cur.children.length > 0
            ? 1 + cur.children?.length
            : 1),
    0,
)
export { sideBarMenusSize, sideBarMenusTotalSize }
