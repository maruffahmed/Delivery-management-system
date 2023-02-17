export const classNames = (...classes: (string | undefined | null)[]) => {
    return classes.filter(Boolean).join(' ')
}
