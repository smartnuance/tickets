import React from 'react';
import { useRemoveTicket } from '../constants/Queries';
import { Ticket, TicketID, User } from '../constants/Types';
import LinkButton from './form/LinkButton';
import Button from './form/Button';
import Image from 'next/image';
import Avatar from './Avatar';
import Hint from './Hint';
import Link from 'next/link';
import { CheckCircle, MessageCircle, Play } from 'react-feather';
import { cva } from 'class-variance-authority';

export const ticketStyle = cva([], {
    variants: {
        type: {
            story: [],
            epic: ['shadow-fuchsia-500/50'],
        },
    },
    defaultVariants: {
        type: 'story',
    },
});

export default function RenderTicket({
    ticket,
    onRemoved,
    showAuthorTools,
}: {
    ticket: Ticket<User>;
    onRemoved?: (id: TicketID) => unknown;
    showAuthorTools?: boolean;
}) {
    const { isLoading: isRemovingTicket, mutate: removeTicket } =
        useRemoveTicket({
            id: ticket.id,
            onRemoved,
        });
    const epic = ticket.members && ticket.members.length > 0;

    return (
        <div
            className={`${ticketStyle({
                type: epic ? 'epic' : 'story',
            })} relative overflow-hidden w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]`}
        >
            {epic && (
                <div className="absolute left-0 top-0 h-16 w-16">
                    <div className="absolute transform -rotate-45 bg-fuchsia-500 text-center drop-shadow-lg hover:drop-shadow-xl text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                        Epic
                    </div>
                </div>
            )}
            <Image
                className="w-full h-auto rounded-t-xl"
                src="/500x300.jpg"
                alt="Image Description"
                width={500}
                height={300}
            />
            <div className="p-4 md:p-5 h-full">
                <h3 className="flex text-lg font-bold text-gray-800 dark:text-white">
                    <TicketState ticket={ticket} />
                    <span className="ml-3">{ticket.title}</span>
                    <Hint id={ticket.id}></Hint>
                </h3>
                <p className="mt-1 text-gray-800 dark:text-gray-400">
                    {isRemovingTicket ? 'Removing ticket' : ticket.body}
                </p>
                {ticket.members && ticket.members.length > 0 && (
                    <ul role="list" className="py-6 mt-4 space-y-6 border-y">
                        {ticket.members?.map((member) => (
                            <li className="flex text-gray-500" key={member.id}>
                                <TicketState ticket={ticket} />

                                <Link href={`/`}>
                                    <span className="ml-3">{member.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {ticket.author && (
                    <div className="relative flex items-center mt-4">
                        <span className="font-bold text-gray-400 mr-2 w-20">
                            Author:
                        </span>
                        <Avatar user={ticket.author}></Avatar>
                    </div>
                )}
                {ticket.reviewers && ticket.reviewers.length > 0 && (
                    <div className="relative flex items-center mt-4 flex-wrap">
                        <span className="font-bold text-gray-400 mr-2 w-20">
                            Reviewers:
                        </span>
                        {ticket.reviewers?.map((user) => (
                            <Avatar user={user} key={user.id}></Avatar>
                        ))}
                    </div>
                )}
            </div>
            {showAuthorTools && (
                <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 text-sm text-gray-500 dark:text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex gap-4">
                        <LinkButton href={`/edit#${ticket.id}`} size="small">
                            edit
                        </LinkButton>
                        <Button
                            onClick={() => removeTicket()}
                            size="small"
                            color="black"
                        >
                            {isRemovingTicket ? 'Working' : 'delete'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function TicketState({ ticket }: { ticket: Ticket<User> }) {
    return ticket.archived ? (
        <CheckCircle />
    ) : ticket.reviewers?.length ?? 0 > 0 ? (
        <MessageCircle />
    ) : (
        <Play />
    );
}
