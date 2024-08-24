import React from 'react'

interface PromptInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
}

export function PromptInput({ label, value, onChange, placeholder }: PromptInputProps) {
    return (
        <div className="w-full">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <input
                type="text"
                id={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-dark-400 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-white"
                placeholder={placeholder}
            />
        </div>
    )
}