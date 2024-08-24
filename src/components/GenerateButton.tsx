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
            className="w-full px-6 py-3 bg-spotify-green hover:bg-opacity-80 text-spotify-black font-semibold rounded-full shadow transition duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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