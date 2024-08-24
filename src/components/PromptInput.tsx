import React from 'react'

interface PromptInputProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
}

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
    return (
        <div className="w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-spotify-black border-none rounded-full text-spotify-white placeholder-spotify-darkGray focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder={placeholder}
            />
        </div>
    )
}