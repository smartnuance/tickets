import Link from 'next/link';
import React from 'react';
import { User } from '../constants/Types';
import Hint from './Hint';

export default function Avatar({ user }: { user: User }) {
    return (
        <Link
            href={{
                pathname: '/assigned/[user]',
                query: { user: user.id },
            }}
            className="inline-flex gap-1.5 items-center ml-4"
        >
            <div className="rounded-full bg-slate-300 w-7 h-7 text-sm flex justify-center items-center">
                {/* If author name contains of multiple segments */}
                {user.name.split(' ').length > 1 // Grab the first letter from first and last segment.
                    ? user.name.split(' ')[0][0].toUpperCase() +
                      user.name.split(' ').pop()?.[0].toUpperCase() // Otherwise grab first two letters
                    : user.name?.slice(0, 2).toUpperCase()}
            </div>
            <p className="font-light">{user.name}</p>
            <Hint id={user.id}></Hint>
        </Link>
    );
}
