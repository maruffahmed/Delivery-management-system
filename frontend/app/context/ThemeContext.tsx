import React from 'react'

export interface ContextType {
    isSideMenuOpen: Boolean
    setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    isDarkMode: Boolean
    setIsDarkMode: Function
    toggleDarkMode: Function
}

const ThemeContext = React.createContext<ContextType | null>(null)
ThemeContext.displayName = 'ThemeContext'

const setTheme = (theme: string, setState: Function, stateValue: Boolean) => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
    setState(stateValue)
}

function ThemeProvider(props: any) {
    const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false)
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    React.useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            window.localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setTheme('dark', setIsDarkMode, true)
        } else {
            setTheme('light', setIsDarkMode, false)
        }
        // Whenever the user explicitly chooses to respect the OS preference
        // window.localStorage.removeItem("theme")
    }, [])
    const toggleDarkMode = () => {
        if (window.localStorage.theme === 'dark') {
            setTheme('light', setIsDarkMode, false)
        } else {
            setTheme('dark', setIsDarkMode, true)
        }
    }
    return (
        <ThemeContext.Provider
            value={{
                isSideMenuOpen,
                setIsSideMenuOpen,
                isDarkMode,
                setIsDarkMode,
                toggleDarkMode,
            }}
            {...props}
        />
    )
}

export const useThemeProvider = () => {
    const context = React.useContext(ThemeContext) as ContextType
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export default ThemeProvider
