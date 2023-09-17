import { Link } from '@remix-run/react'
import { useThemeProvider } from '~/context/ThemeContext'
import type { SideBarMenuType } from './SideBarHelper'
import { SideBarMenuItem } from './SideBarHelper'

function MobileSidebar({
    title,
    menus,
}: {
    title: string
    menus: SideBarMenuType[]
}) {
    const { setIsSideMenuOpen, isSideMenuOpen } = useThemeProvider()
    return (
        <>
            {isSideMenuOpen && (
                <>
                    <div
                        onClick={() => setIsSideMenuOpen(false)}
                        aria-label="mobile-sidebar-overlay"
                        className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    ></div>

                    <aside className=" fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden">
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
                                          <SideBarMenuItem
                                              item={item}
                                              key={index}
                                          />
                                      ))
                                    : null}
                            </ul>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}

export default MobileSidebar
