import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '~/utils'

function Button({
    href,
    className,
    children,
    type,
    disabled,
    ...props
}: {
    href?: string
    className?: string
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}) {
    const style = classNames(
        'px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple',
        className,
    )

    return (
        <>
            {href ? (
                <Link to={href} className={style} {...props}>
                    {children}
                </Link>
            ) : (
                <button
                    className={style}
                    type={type}
                    disabled={disabled}
                    {...props}
                >
                    {children}
                </button>
            )}
        </>
    )
}

export default Button
