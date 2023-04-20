import type {
    ParcelPrices,
    ParcelProductParentCategories,
    PickupPoints,
} from '~/types'
import React from 'react'
import { getParcelProductParentCateogires } from '~/utils/merchant/CSR_API'
import { useQuery } from 'react-query'
import { calculateDeliveryCharge } from '~/utils'

interface CreateParcelContextType {
    pickupPoints: PickupPoints
    parcelPrices: ParcelPrices
    selectedArea:
        | {
              area: string
              zoneId: number
          }
        | undefined
    setSelectedArea: React.Dispatch<
        React.SetStateAction<
            | {
                  area: string
                  zoneId: number
              }
            | undefined
        >
    >
    parcelProductParentCat: ParcelProductParentCategories | undefined
    deliveryCharge: number
    weight: number
    setWeight: React.Dispatch<React.SetStateAction<number>>
    COD_CHARGE: number
    totalCharge: number
    cashCollectionAmount: number
    setCashCollectionAmount: React.Dispatch<React.SetStateAction<number>>
}
const CreateParcelContext = React.createContext<CreateParcelContextType | null>(
    null,
)
CreateParcelContext.displayName = 'CreateParcelContext'

export const CreateParcelProvider = ({
    pickupPoints,
    parcelPrices,
    ...props
}: {
    pickupPoints: PickupPoints
    parcelPrices: ParcelPrices
    children: React.ReactNode
}) => {
    // Get parcel product parent categories
    const { data: parcelProductParentCat } = useQuery({
        queryKey: 'parcelProductParentCategories',
        queryFn: () => getParcelProductParentCateogires(),
    })

    const [cashCollectionAmount, setCashCollectionAmount] =
        React.useState<number>(0)
    // calculate COD charge
    const COD_CHARGE = React.useMemo(() => {
        if (cashCollectionAmount < 1 || !cashCollectionAmount) return 0
        return cashCollectionAmount / 100
    }, [cashCollectionAmount])

    const [selectedArea, setSelectedArea] = React.useState<{
        area: string
        zoneId: number
    }>()
    const [weight, setWeight] = React.useState<number>(0)
    // calculate delivery charge
    const deliveryCharge = React.useMemo(() => {
        return calculateDeliveryCharge({
            weight,
            zoneId: selectedArea?.zoneId!,
            parcelPrices,
        })
    }, [parcelPrices, selectedArea?.zoneId, weight])

    // calculate total charge
    const totalCharge = React.useMemo(() => {
        return deliveryCharge + COD_CHARGE
    }, [COD_CHARGE, deliveryCharge])
    return (
        <CreateParcelContext.Provider
            value={{
                parcelPrices,
                pickupPoints,
                selectedArea,
                setSelectedArea,
                parcelProductParentCat,
                deliveryCharge,
                weight,
                setWeight,
                COD_CHARGE,
                totalCharge,
                cashCollectionAmount,
                setCashCollectionAmount,
            }}
            {...props}
        />
    )
}

export const useCreateParcelContext = () => {
    const context = React.useContext(CreateParcelContext)
    if (!context) {
        throw new Error(
            'useCreateParcelContext must be used within a CreateParcelContext.Provider',
        )
    }
    return context
}
