import React from 'react'
import type { PickupPoint } from '~/types'

export type PickupPointContextType = {
    pickupPoint: PickupPoint | null
    setPickupPoint: (pickupPoint: PickupPoint | null) => void
}

const PickupPointContext = React.createContext<PickupPointContextType | null>(
    null,
)
PickupPointContext.displayName = 'PickupPointContext'

const PickupPointProvider = ({ ...props }) => {
    const [pickupPoint, setPickupPoint] = React.useState<PickupPoint | null>(
        null,
    )
    return (
        <PickupPointContext.Provider
            value={{ pickupPoint, setPickupPoint }}
            {...props}
        />
    )
}

export const usePickupPoint = () => {
    const context = React.useContext(
        PickupPointContext,
    ) as PickupPointContextType
    if (context === undefined) {
        throw new Error(
            'usePickupPoint must be used within a PickupPointProvider',
        )
    }
    return context
}

export default PickupPointProvider
