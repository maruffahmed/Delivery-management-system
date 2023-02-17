import React from 'react'
import Nav from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default Layout
