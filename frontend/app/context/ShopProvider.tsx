import type { Shop } from '~/types'
import React from 'react'

interface ShopContextType {
    // shops: Shops
    // storeShops: (shops: Shops) => void
    activeShop: Shop | null
    storeActiveShop: (shop: Shop) => void
    chnageActiveShop: (shop: Shop) => void
    resetShopProvider: () => void
}

const storeActiveShopCookie = (shop: Shop) => {
    const shopCookie = JSON.stringify(shop)
    document.cookie = `xshop=activeShop${shopCookie}activeShop; path=/; max-age=2592000 ; samesite=lax; secure `
}

export const ShopContext = React.createContext<ShopContextType | null>(null)
ShopContext.displayName = 'ShopContext'

function ShopProvider({ ...props }: { children: React.ReactNode }) {
    // const [shops, setShops] = React.useState<Shops>({ data: [] })
    const [activeShop, setActiveShop] = React.useState<Shop | null>(null)
    // const storeShops = (shops: Shops) => {
    //     window.localStorage.setItem('xshops', JSON.stringify(shops))
    //     setShops(shops)
    // }

    // React.useEffect(() => {
    //     const lsShops = window.localStorage.getItem('xshops')
    //     if (lsShops) {
    //         const lsShopsData = JSON.parse(lsShops)
    //         setShops(lsShopsData)
    //     }
    //     console.log('Run useEffect in ShopProvider storeShops')
    // }, [])

    const storeActiveShop = React.useCallback((shop: Shop) => {
        const lsShop = window.localStorage.getItem('xshop')
        if (lsShop) {
            const lsShopData = JSON.parse(lsShop)
            setActiveShop(lsShopData)
            storeActiveShopCookie(lsShopData)
        } else {
            window.localStorage.setItem('xshop', JSON.stringify(shop))
            storeActiveShopCookie(shop)
            setActiveShop(shop)
        }
    }, [])

    const chnageActiveShop = React.useCallback((shop: Shop) => {
        window.localStorage.setItem('xshop', JSON.stringify(shop))
        storeActiveShopCookie(shop)
        setActiveShop(shop)
    }, [])

    React.useEffect(() => {
        const lsShop = window.localStorage.getItem('xshop')
        if (lsShop) {
            const lsShopData = JSON.parse(lsShop)
            setActiveShop(lsShopData)
            storeActiveShopCookie(lsShopData)
        }
        console.log('Run useEffect in ShopProvider storeActiveShop')
    }, [])

    const resetShopProvider = () => {
        // window.localStorage.removeItem('xshops')
        window.localStorage.removeItem('xshop')
        // setShops({ data: [] })
        setActiveShop(null)
    }
    return (
        <ShopContext.Provider
            value={{
                // shops,
                // storeShops,
                activeShop,
                storeActiveShop,
                chnageActiveShop,
                resetShopProvider,
            }}
            {...props}
        />
    )
}

export const useShopProvider = () => {
    const context = React.useContext(ShopContext) as ShopContextType
    if (!context) {
        throw new Error('useShopProvider must be used within a ShopProvider')
    }
    return context
}

export default ShopProvider
