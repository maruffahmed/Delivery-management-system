import React from 'react'

type ContextType = {
    progress: number
    setProgress: (progress: number) => void
}
const TopProgressBarContext = React.createContext<ContextType | null>(null)
TopProgressBarContext.displayName = 'TopProgressBarContext'

function TopProgressBarProvider({ ...props }: { children: React.ReactNode }) {
    const [progress, setProgress] = React.useState(0)
    return (
        <TopProgressBarContext.Provider
            value={{ progress, setProgress }}
            {...props}
        />
    )
}

export const useTopProgressBarProvider = () => {
    const context = React.useContext(TopProgressBarContext) as ContextType
    if (context === undefined) {
        throw new Error(
            'useTopProgressBarProvider must be used within a TopProgressBarProvider',
        )
    }
    return context
}

export default TopProgressBarProvider
