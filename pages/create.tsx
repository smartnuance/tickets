import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import TicketEditor from '../components/TicketEditor';
import { useAuthenticatedUser, useCreateTicket } from '../constants/Queries';
import Head from '../components/Head';

export default function Create() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const { isLoading, mutate } = useCreateTicket({
        onCreated: () => router.push('/'),
    });

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    return (
        <>
            <Head title="Create ticket" robots="noindex, follow" />
            <TicketEditor
                {...{
                    title: 'Create ticket',
                    isLoading,
                    onSave: mutate,
                }}
            />
        </>
    );
}
