import React from 'react'
import { Loader } from 'react-feather'

interface GenerateButtonProps {
    onClick: () => void
    isGenerating: boolean
}

export function GenerateButton({ onClick, isGenerating }: GenerateButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isGenerating}
            className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-md shadow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isGenerating ? (
                <span className="flex items-center justify-center">
                    <Loader className="animate-spin mr-2" size={20} />
                    Generating...
                </span>
            ) : (
                'Generate Music'
            )}
        </button>
    )
}