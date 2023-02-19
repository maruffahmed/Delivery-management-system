import React from 'react'
import { useAuthProvider } from '~/context/AuthProvider'
import MerchantNav from './merchant/Navbar'
import Navbar from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {
    const user = useAuthProvider()
    return (
        <>
            {user?.id ? <MerchantNav /> : <Navbar />}
            {children}
        </>
    )
}

export default Layout
