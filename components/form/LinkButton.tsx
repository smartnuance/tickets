import Link, { LinkProps } from 'next/link';
import React, { ForwardedRef, ReactNode, forwardRef } from 'react';
import { ButtonColor, ButtonSize, buttonStyle } from './Button';

const LinkButton = forwardRef(
    (
        {
            className,
            color,
            size,
            ...props
        }: LinkProps & {
            children?: ReactNode;
            className?: string;
            color?: ButtonColor;
            size?: ButtonSize;
        },
        ref: ForwardedRef<HTMLAnchorElement>
    ) => {
        return (
            <div
                className={`${buttonStyle({ color, size })} ${
                    className ?? ''
                } py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`}
            >
                <Link {...props} ref={ref} />
            </div>
        );
    }
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
