import { Link } from '@remix-run/react'
import type { SideBarMenuType } from './SideBarHelper'
import { SideBarMenuItem } from './SideBarHelper'

function DesktopSidebar({
    title,
    menus,
}: {
    title: string
    menus: SideBarMenuType[]
}) {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <Link
                    className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    to="/"
                >
                    {title}
                </Link>
                <ul className="mt-6">
                    {menus?.length
                        ? menus.map((item, index) => (
                              <SideBarMenuItem item={item} key={index} />
                          ))
                        : null}
                </ul>
            </div>
        </aside>
    )
}

export default DesktopSidebar
