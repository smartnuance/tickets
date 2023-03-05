import React from 'react';
import { InputHTMLAttributes, ReactNode } from 'react';
import { useUpdateConfig } from '../constants/Queries';
import { Config } from '../constants/Types';

export default function ConfigSwitch({
    config,
    label,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    config: Config;
    label?: ReactNode;
}) {
    const { mutate: updateConfig } = useUpdateConfig({
        id: config.id,
    });
    const handleChange = () => {
        updateConfig({
            ...config,
            showHints: !config.showHints,
        });
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id="show-hints"
                className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-yellow-400 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-yellow-600 focus:ring-yellow-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-yellow-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-yellow-100 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-yellow-200"
                checked={config?.showHints}
                onChange={handleChange}
                {...props}
            />
            <label
                htmlFor="show-hints"
                className="text-sm text-gray-400 ml-3 dark:text-gray-400"
            >
                {label}
            </label>
        </div>
    );
}
