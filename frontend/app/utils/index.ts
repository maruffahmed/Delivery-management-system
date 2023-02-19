export const classNames = (...classes: (string | undefined | null)[]) => {
    return classes.filter(Boolean).join(' ')
}

export function validateUrl(url: string) {
    console.log(url)
    let urls = [
        '/dashboard',
        '/products',
        '/products/list',
        '/products/add',
        '/',
        'https://remix.run',
    ]
    if (urls.includes(url)) {
        return url
    }
    return '/dashboard'
}
