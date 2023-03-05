import { cva } from 'class-variance-authority';
import React, {
    DetailedHTMLProps,
    ForwardedRef,
    InputHTMLAttributes,
    forwardRef,
} from 'react';

export const inputStyle = cva(['w-full', 'rounded'], {
    variants: {
        size: {
            small: ['px-4', 'py-2'],
            normal: ['px-8', 'py-4'],
        },
    },
    defaultVariants: {
        size: 'normal',
    },
});

export type InputSize = Exclude<
    Exclude<Parameters<typeof inputStyle>[0], undefined>['size'],
    null | undefined
>;

const Input = forwardRef(
    (
        {
            className,
            size,
            ...props
        }: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        > & {
            size?: InputSize;
        },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <input
                className={`${inputStyle({
                    size,
                })} py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                    className ?? ''
                }`}
                {...props}
                ref={ref}
            />
        );
    }
);

Input.displayName = 'Input';
export default Input;
