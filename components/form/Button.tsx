import { cva } from 'class-variance-authority';
import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ForwardedRef,
    forwardRef,
} from 'react';

export const buttonStyle = cva([], {
    variants: {
        color: {
            fuchsia: ['bg-fuchsia-500', 'hover:bg-fuchsia-600', 'text-white'],
            red: ['bg-red-600', 'text-white'],
            black: ['bg-gray-500', 'hover:bg-gray-600', 'text-white'],
        },
        size: {
            small: ['px-4', 'py-2', 'rounded-md'],
            normal: ['px-6', 'py-2.5', 'rounded-md', 'text-lg'],
        },
    },
    defaultVariants: {
        color: 'fuchsia',
        size: 'normal',
    },
});

export type ButtonColor = Exclude<
    Exclude<Parameters<typeof buttonStyle>[0], undefined>['color'],
    null | undefined
>;
export type ButtonSize = Exclude<
    Exclude<Parameters<typeof buttonStyle>[0], undefined>['size'],
    null | undefined
>;

const Button = forwardRef(
    (
        {
            className,
            color,
            size,
            ...props
        }: DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > & {
            color?: ButtonColor;
            size?: ButtonSize;
        },
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        return (
            <button
                className={`${buttonStyle({ color, size })} ${
                    className ?? ''
                } py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`}
                {...props}
                ref={ref}
            />
        );
    }
);

Button.displayName = 'Button';
export default Button;
