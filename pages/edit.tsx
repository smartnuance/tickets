import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import TicketEditor from '../components/TicketEditor';
import {
    useAuthenticatedUser,
    useTicket,
    useUpdateTicket,
} from '../constants/Queries';
import { TicketID, User } from '../constants/Types';
import Head from '../components/Head';

export default function Edit() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const id: TicketID = (router.asPath.match(/#(.*)/)?.[1] ?? '') as TicketID;
    const { isLoading: isSearching, data: ticket } = useTicket<User>({
        id,
        fetchAuthor: true,
    });

    const { isLoading: isUpdatingTicket, mutate: updateTicket } =
        useUpdateTicket({
            id,
            onUpdated: () => router.push('/'),
        });

    useEffect(() => {
        if (!id) router.push('/');
        if (!user) router.push('/signin');
    }, [id, user, router]);

    // Signed in users can only edit their own tickets.
    const userIsAuthor = ticket?.author.id == user?.id;
    const errorMessage = isSearching
        ? 'Searching the ticket'
        : !userIsAuthor
        ? 'You are not the author of this ticket'
        : !ticket
        ? 'Ticket not found'
        : undefined;

    return (
        <>
            <Head title="Create ticket" robots="noindex, follow" />
            <TicketEditor
                {...{
                    title: 'Edit ticket',
                    onSave: updateTicket,
                    isLoading: isUpdatingTicket,
                    ticket,
                    errorMessage,
                }}
            />
        </>
    );
}
