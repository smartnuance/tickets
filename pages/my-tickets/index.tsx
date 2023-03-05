import React from 'react';
import Alert from '../../components/Alert';
import Head from '../../components/Head';
import Hint from '../../components/Hint';
import RenderTicket from '../../components/Ticket';
import { useAuthenticatedUser, useMyTickets } from '../../constants/Queries';
import { User, UserID } from '../../constants/Types';

export default function MyTickets() {
    const { data: user } = useAuthenticatedUser();

    return (
        <>
            <Head title="My Tickets" />
            <div className="relative container mx-auto mt-48">
                <h2 className="font-bold mt-4 mb-12 text-5xl">My tickets</h2>
                <Hint
                    kind="query"
                    id="SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket WHERE author = $id ORDER BY created DESC FETCH author, reviewers, members.title"
                ></Hint>

                {!user ? (
                    <Alert title="Permission denied" message="Not signed in." />
                ) : (
                    <TicketList userID={user.id}></TicketList>
                )}
            </div>
        </>
    );
}

function TicketList({ userID }: { userID: UserID }) {
    const { isLoading, data, refetch } = useMyTickets<User>(userID);

    return (
        <>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-12">
                    {data?.map((ticket) => (
                        <RenderTicket
                            ticket={ticket}
                            key={ticket.id}
                            onRemoved={() => refetch()}
                            showAuthorTools={ticket.author?.id === userID}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
