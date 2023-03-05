import React, { ReactNode } from 'react';
import { AlertCircle } from 'react-feather';

export default function Alert({
    title,
    message,
}: {
    title: ReactNode;
    message?: ReactNode;
}) {
    return (
        <div
            className="bg-yellow-50 border border-yellow-200 rounded-md p-4"
            role="alert"
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertCircle className="h-8 w-8 text-yellow-400 mt-0.5" />
                </div>
                <div className="ml-4">
                    <h3 className="text-sm text-yellow-800 font-semibold">
                        {title}
                    </h3>
                    {message && (
                        <div className="mt-1 text-sm text-yellow-700">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
