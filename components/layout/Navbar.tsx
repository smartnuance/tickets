import Image from 'next/image';
import React from 'react';
import {
    useAuthenticatedUser,
    useConfig,
    useSurrealSignout,
} from '../../constants/Queries';
import LinkButton from '../form/LinkButton';
import Link from 'next/link';
import Button from '../form/Button';
import Hint from '../Hint';
import ConfigSwitch from '../ConfigSwitch';

export default function Navbar() {
    const { isLoading: isUserLoading, data: user } = useAuthenticatedUser();
    const { mutate: signout } = useSurrealSignout({});
    const { data: config } = useConfig();

    return (
        <div className="fixed top-0 left-0 w-screen z-40">
            <div className="relative bg-white pt-8 mb-8 mx-8 rounded-b-xl">
                <div className="h-24 px-8 bg-neutral-900 rounded-xl flex items-center justify-between gap-12">
                    <Link href="/">
                        <Image
                            src="/logo-full.svg"
                            alt="Logo"
                            width={200}
                            height={50}
                        />
                    </Link>
                    <div className="flex gap-12 items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-400 hover:text-gray-300"
                        >
                            All Tickets
                        </Link>
                        {user && (
                            <>
                                <Link
                                    href="/my-tickets"
                                    className="text-xl font-bold text-gray-400 hover:text-gray-300"
                                >
                                    My Tickets
                                </Link>
                                <Link
                                    href={{
                                        pathname: '/assigned/[user]',
                                        query: { user: user.id },
                                    }}
                                    className="text-xl font-bold text-gray-400 hover:text-gray-300"
                                >
                                    Assigned to me
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex gap-12 items-center">
                        {!isUserLoading && !user && (
                            <>
                                <LinkButton href="/signin">signin</LinkButton>
                                <LinkButton href="/signup">signup</LinkButton>
                            </>
                        )}
                        {!isUserLoading && user && config && (
                            <>
                                <Hint id={user.id}></Hint>
                                <ConfigSwitch
                                    config={config}
                                    label="hints"
                                ></ConfigSwitch>
                                <Button onClick={() => signout()}>
                                    signout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
