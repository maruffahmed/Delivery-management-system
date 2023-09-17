import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { ClientStyleContext } from './context'
import createEmotionCache, { defaultCache } from './createEmotionCache'

interface ClientCacheProviderProps {
    children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
    const [cache, setCache] = useState(defaultCache)

    function reset() {
        setCache(createEmotionCache())
    }

    return (
        <ClientStyleContext.Provider value={{ reset }}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    )
}

function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <ClientCacheProvider>
                    <RemixBrowser />
                </ClientCacheProvider>
            </StrictMode>,
        )
    })
}

if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(hydrate)
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1)
}
