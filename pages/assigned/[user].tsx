import { useRouter } from 'next/router';
import React from 'react';
import Alert from '../../components/Alert';
import Avatar from '../../components/Avatar';
import Head from '../../components/Head';
import Hint from '../../components/Hint';
import RenderTicket from '../../components/Ticket';
import {
    useAssignedTickets,
    useAuthenticatedUser,
    useUser,
} from '../../constants/Queries';
import { User, UserID } from '../../constants/Types';

export default function AssignedTickets() {
    const router = useRouter();
    const { user: user_id } = router.query;
    const { data: auth_user } = useAuthenticatedUser();
    const { data: user } = useUser(user_id);

    return (
        <>
            <Head title="Assigned to me" />
            <div className="relative container mx-auto mt-48">
                {!user ? (
                    <Alert title="Permission denied" message="Not signed in." />
                ) : (
                    <h2 className="font-bold mt-4 mb-12 text-5xl">
                        Assigned to{' '}
                        {auth_user?.id == user_id ? (
                            'me'
                        ) : (
                            <Avatar user={user}></Avatar>
                        )}
                    </h2>
                )}

                <Hint
                    kind="query"
                    id={`SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket WHERE <-reviews<-user CONTAINS ${user_id} ORDER BY created DESC FETCH author, reviewers, members.title`}
                ></Hint>

                <TicketList userID={user_id}></TicketList>
            </div>
        </>
    );
}

function TicketList({ userID }: { userID: UserID }) {
    const { isLoading, data, refetch } = useAssignedTickets<User>(userID);

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
                            showAssignToMe={true}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
