import React, {
    DetailedHTMLProps,
    ForwardedRef,
    TextareaHTMLAttributes,
    forwardRef,
} from 'react';
import { InputSize, inputStyle } from './Input';

const Textarea = forwardRef(
    (
        {
            className,
            size,
            ...props
        }: DetailedHTMLProps<
            TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        > & {
            size?: InputSize;
        },
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        return (
            <textarea
                className={`${inputStyle({
                    size,
                })} py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-cyan-500 focus:ring-cyan-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                    className ?? ''
                }`}
                {...props}
                ref={ref}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export default Textarea;
