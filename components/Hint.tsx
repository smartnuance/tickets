import { cva } from 'class-variance-authority';
import React from 'react';
import { Check, Copy } from 'react-feather';
import { useConfig } from '../constants/Queries';

export const hintStyle = cva([], {
    variants: {
        kind: {
            record: ['bg-yellow-100'],
            query: ['bg-green-100'],
        },
    },
    defaultVariants: {
        kind: 'record',
    },
});

export type Kind = Exclude<
    Exclude<Parameters<typeof hintStyle>[0], undefined>['kind'],
    null | undefined
>;

export default function Hint({
    id,
    kind,
}: { id: string } & {
    kind?: Kind;
}) {
    const { ref, copied, onCopy } = useClipboard({ duration: 3000 });
    const { data: config } = useConfig();

    if (!config?.showHints) {
        return null;
    }

    return (
        <>
            <div className="absolute top-0 right-0 flex">
                <kbd
                    ref={ref}
                    className={`${hintStyle({
                        kind,
                    })} rounded-l-md ml-2 px-2 py-1.5 text-xs font-semibold text-gray-800  border border-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`}
                >
                    {id}
                </kbd>
                <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center h-[1.8rem] w-[1.8rem] rounded-r-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-sm"
                    onClick={onCopy}
                >
                    {copied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            </div>
        </>
    );
}

const useClipboard = (props) => {
    const [copied, setCopied] = React.useState(false);
    const ref = React.useRef();
    const resetCopy = React.useRef();

    const onCopy = React.useCallback(() => {
        navigator.clipboard
            .writeText(ref.current?.innerText)
            .then(() => setCopied(true));
    }, [ref]);

    React.useEffect(() => {
        if (copied) {
            resetCopy.current = setTimeout(
                () => setCopied(false),
                props?.duration || 3000
            );
        }

        return () => {
            clearTimeout(resetCopy.current);
        };
    }, [copied, props.duration]);

    return { copied, ref, onCopy };
};
