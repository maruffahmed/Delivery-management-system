import type { SelectProps } from '@chakra-ui/react'
import type { ProductChildCategories, ProductParentCategories } from '~/types'
import { Select } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { getShopParentCategories } from '~/utils/merchant/CSR_API'

export type ShopProductCatSelectContextType = {
    productParentCategories: ProductParentCategories | undefined
    productChildCat: ProductChildCategories | undefined
    handleProductChildCat: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const ShopProductCatSelectContext =
    React.createContext<ShopProductCatSelectContextType | null>(null)
ShopProductCatSelectContext.displayName = 'ShopProductCatSelectContext'

export const ShopProductCatSelectProvider = (props: any) => {
    const [productChildCat, setProductChildCat] =
        React.useState<ProductChildCategories>()

    const { data: productParentCategories } = useQuery({
        queryKey: 'shopProductParentCat',
        queryFn: () => getShopParentCategories(),
    })

    const handleProductChildCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCat = productParentCategories?.data.find(
            (cat) => cat.name === e.target.value,
        )
        setProductChildCat({
            data: selectedCat?.childs,
        })
    }
    return (
        <ShopProductCatSelectContext.Provider
            value={{
                productParentCategories,
                productChildCat,
                handleProductChildCat,
            }}
            {...props}
        />
    )
}

export const useShopProductCatSelect = () => {
    const context = React.useContext(ShopProductCatSelectContext)
    if (!context) {
        throw new Error(
            'useShopProductCatSelect must be used within a ShopProductCatSelectProvider',
        )
    }
    return context
}

export const ShopProductParentCategoriesSelect = (props: SelectProps) => {
    const { productParentCategories, handleProductChildCat } =
        useShopProductCatSelect()
    return (
        <Select
            focusBorderColor="primary.500"
            onChange={handleProductChildCat}
            {...props}
        >
            {productParentCategories?.data.length
                ? productParentCategories?.data.map((cat) => {
                      return (
                          <option value={cat.name} key={cat.id}>
                              {cat.name}
                          </option>
                      )
                  })
                : null}
        </Select>
    )
}

export const ShopProductChildCategoriesSelect = (props: SelectProps) => {
    const { productChildCat } = useShopProductCatSelect()
    return (
        <Select focusBorderColor="primary.500" {...props}>
            {productChildCat?.data?.length
                ? productChildCat?.data.map((cat) => {
                      return (
                          <option value={cat.name} key={cat.id}>
                              {cat.name}
                          </option>
                      )
                  })
                : null}
        </Select>
    )
}
