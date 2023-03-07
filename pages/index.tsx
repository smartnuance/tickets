import React from 'react';
import RenderTicket from '../components/Ticket';
import { useAuthenticatedUser, useTickets } from '../constants/Queries';
import { User } from '../constants/Types';
import Head from '../components/Head';
import LinkButton from '../components/form/LinkButton';
import { PlusCircle } from 'react-feather';
import Alert from '../components/Alert';
import Hint from '../components/Hint';

export default function Home() {
    const { isLoading, error, data, refetch } = useTickets<User>({
        fetchAuthor: true,
    });

    const { data: user } = useAuthenticatedUser();

    return (
        <>
            <Head title="Tickets" />
            <div className="relative container mx-auto mt-48">
                <h2 className="font-bold mt-4 mb-12 text-5xl flex items-center">
                    Tickets{' '}
                    <LinkButton
                        href="/create"
                        className="flex item-center ml-3"
                    >
                        <PlusCircle className="inline-flex mr-2" />
                        Add Ticket
                    </LinkButton>
                </h2>
                <Hint
                    kind="query"
                    id="SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket ORDER BY created DESC FETCH author, reviewers, members.title"
                ></Hint>

                {isLoading ? (
                    <Alert title="Loading tickets..." />
                ) : error ? (
                    <Alert title="Failed to load tickets" />
                ) : data?.length == 0 ? (
                    <Alert title="No tickets available, create one!" />
                ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-12">
                        {data?.map((ticket) => (
                            <RenderTicket
                                ticket={ticket}
                                key={ticket.id}
                                onRemoved={() => refetch()}
                                showAuthorTools={ticket.author?.id === user?.id}
                                showAssignToMe={!!user}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
