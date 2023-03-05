import React, { FormEventHandler, ReactNode } from 'react';
import Button from '../form/Button';

export default function FormPage({
    title,
    onSubmit,
    children,
    isLoading,
    button,
}: {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
    isLoading: boolean;
    button?: string | ReactNode;
}) {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="mx-auto max-w-2xl">
                <div className="text-center">
                    <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                        {title}
                    </h2>
                </div>

                <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={onSubmit}>
                        {children}

                        <div className="mt-6 grid">
                            {typeof button == 'string' || !button ? (
                                <Button disabled={isLoading}>
                                    {isLoading
                                        ? 'Loading'
                                        : button ?? 'Continue'}
                                </Button>
                            ) : (
                                button
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
