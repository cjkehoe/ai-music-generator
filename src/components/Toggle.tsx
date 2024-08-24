import { Switch } from '@headlessui/react'

interface ToggleProps {
    enabled: boolean
    setEnabled: (enabled: boolean) => void
}

export function Toggle({ enabled, setEnabled }: ToggleProps) {
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-dark-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-300`}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
        </Switch>
    )
}