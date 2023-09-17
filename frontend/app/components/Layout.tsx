import React from 'react'
import { useAuthProvider } from '~/context/AuthProvider'
import MerchantNav from './merchant/Navbar'
import Navbar from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {
    const { id, roles } = useAuthProvider()
    return (
        <>
            {id && roles[0].role.name == 'merchant' ? (
                <MerchantNav />
            ) : (
                <Navbar />
            )}
            <main>{children}</main>
        </>
    )
}

export default Layout
