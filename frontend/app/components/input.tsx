import React from 'react'

function Input(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
) {
    return (
        <input
            {...props}
            type={props.type ? props.type : 'text'}
            className="block w-full mt-1 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input placeholder:text-gray-300"
        />
    )
}

export default Input
