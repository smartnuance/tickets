import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    SurrealInstance,
    SurrealSignin,
    SurrealSignout,
    SurrealSignup,
} from '../lib/Surreal';
import {
    Ticket,
    TicketID,
    TicketInput,
    SigninDetails,
    SignupDetails,
    User,
    UserID,
    Config,
    ConfigID,
    ConfigInput,
} from './Types';
import {
    processTicketRecord,
    processUserRecord,
} from '../lib/ProcessDatabaseRecord';

// Contains wrapper react-query functions to make them easily reusable.

export function useAuthenticatedUser() {
    return useQuery({
        queryKey: ['authenticated-user'],
        queryFn: async (): Promise<User | null> => {
            const body = await SurrealInstance.opiniatedQuery<User>(
                `SELECT * FROM user WHERE id = $auth.id FETCH config`
            );
            const data = (body[0] && body[0]?.result) ?? [];
            return data.map(processUserRecord).find((a) => !!a) ?? null;
        },
    });
}

export function useUser(id: UserID) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async (): Promise<User | null> => {
            const body = await SurrealInstance.opiniatedQuery<User>(
                `SELECT * FROM user WHERE id = $id`,
                {
                    id,
                }
            );
            const data = (body[0] && body[0]?.result) ?? [];
            return data.map(processUserRecord).find((a) => !!a) ?? null;
        },
    });
}

export function useConfig() {
    const { data: user } = useAuthenticatedUser();
    return useQuery({
        queryKey: ['config', user?.config.id],
        queryFn: async (): Promise<Config | null> => {
            return user?.config ?? null;
        },
        enabled: !!user,
    });
}

export function useSurrealSignin({
    onSuccess,
    onFailure,
}: {
    onSuccess?: () => unknown;
    onFailure?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async (auth: SigninDetails) => {
            if (await SurrealSignin(auth)) {
                refetch();
                onSuccess?.();
            } else {
                onFailure?.();
            }
        },
    });
}

export function useSurrealSignup({
    onSuccess,
    onFailure,
}: {
    onSuccess?: () => unknown;
    onFailure?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async (auth: SignupDetails) => {
            if (await SurrealSignup(auth)) {
                refetch();
                onSuccess?.();
            } else {
                onFailure?.();
            }
        },
    });
}

export function useSurrealSignout({
    onSuccess,
}: {
    onSuccess?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async () => {
            await SurrealSignout();
            refetch();
            onSuccess?.();
        },
    });
}

export function useUpdateConfig({
    id,
}: {
    id: ConfigID;
    onUpdated?: (config: Config) => unknown;
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (config: ConfigInput) => {
            const body = await SurrealInstance.opiniatedQuery<Config>(
                `UPDATE $id CONTENT {
                showHints: $showHints,
            }`,
                {
                    id,
                    ...config,
                }
            );

            if (body[0] && body[0]?.result?.[0]) {
                return body[0] && body[0]?.result?.[0];
            } else {
                throw new Error('Failed to create update config');
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['config', data.id], data);
        },
    });
}

////////////////////////
//////// TICKETS ///////
////////////////////////

export function useTickets<TAuthorType extends UserID | User>({
    fetchAuthor,
}: {
    fetchAuthor: TAuthorType extends User ? true : false;
}) {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: async (): Promise<Ticket<TAuthorType>[]> => {
            const body = await SurrealInstance.opiniatedQuery<
                Ticket<TAuthorType>
            >(
                `SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket ORDER BY created DESC ${
                    fetchAuthor ? 'FETCH author, reviewers, members.title' : ''
                }`
            );
            const data = (body[0] && body[0]?.result) ?? [];
            return data.map((ticket) =>
                processTicketRecord<TAuthorType>(ticket)
            );
        },
    });
}

export function useMyTickets<TAuthorType extends UserID | User>(id: UserID) {
    return useQuery({
        queryKey: ['my-tickets', id],
        queryFn: async (): Promise<Ticket<TAuthorType>[]> => {
            const body = await SurrealInstance.opiniatedQuery<
                Ticket<TAuthorType>
            >(
                `SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket WHERE author = $id ORDER BY created DESC FETCH author, reviewers, members.title`,
                {
                    id,
                }
            );
            const data = (body[0] && body[0]?.result) ?? [];
            return data.map((ticket) =>
                processTicketRecord<TAuthorType>(ticket)
            );
        },
    });
}

export function useAssignedTickets<TAuthorType extends UserID | User>(
    id: UserID
) {
    return useQuery({
        queryKey: ['assigned-to-me-tickets'],
        queryFn: async (): Promise<Ticket<TAuthorType>[]> => {
            const body = await SurrealInstance.opiniatedQuery<User>(
                `SELECT *, <-reviews<-user as reviewers, ->includes->ticket as members FROM ticket WHERE <-reviews<-user CONTAINS user:cld0r7j69000108mg39w4fs4d ORDER BY created DESC FETCH author, reviewers, members.title`,
                {
                    id,
                }
            );

            console.log(body);
            const data = (body[0] && body[0]?.result) ?? [];
            return data.map((ticket) =>
                processTicketRecord<TAuthorType>(ticket)
            );
        },
    });
}

export function useTicket<TAuthorType extends UserID | User>({
    id,
    fetchAuthor,
}: {
    id: TicketID;
    fetchAuthor: TAuthorType extends User ? true : false;
}) {
    return useQuery({
        queryKey: ['ticket', id],
        queryFn: async (): Promise<Ticket<TAuthorType> | null> => {
            const body = await SurrealInstance.opiniatedQuery<
                Ticket<TAuthorType>
            >(
                `SELECT * FROM ticket WHERE id = $id ${
                    fetchAuthor ? 'FETCH author' : ''
                }`,
                { id }
            );
            const data = (body[0] && body[0]?.result) ?? [];
            if (!data[0]) return null;
            return processTicketRecord<TAuthorType>(data[0]);
        },
    });
}

export function useCreateTicket({
    onCreated,
}: {
    onCreated: (ticket: Ticket<UserID>) => unknown;
}) {
    return useMutation({
        mutationFn: async (ticket: TicketInput) => {
            const body = await SurrealInstance.opiniatedQuery<Ticket<UserID>>(
                `CREATE ticket CONTENT {
                title: $title,
                body: $body
            }`,
                ticket
            );

            if (body[0] && body[0]?.result?.[0]) {
                onCreated(body[0] && body[0]?.result[0]);
            } else {
                throw new Error('Failed to create ticket');
            }
        },
    });
}

export function useUpdateTicket({
    id,
    onUpdated,
}: {
    id: TicketID;
    onUpdated?: (ticket: Ticket<UserID>) => unknown;
}) {
    return useMutation({
        mutationFn: async (ticket: TicketInput) => {
            const body = await SurrealInstance.opiniatedQuery<Ticket>(
                `UPDATE ticket CONTENT {
                title: $title,
                body: $body
            } WHERE id = $id`,
                {
                    id,
                    ...ticket,
                }
            );

            if (body[0] && body[0]?.result?.[0]) {
                onUpdated?.(body[0] && body[0]?.result?.[0]);
            } else {
                throw new Error('Failed to create ticket');
            }
        },
    });
}

export function useRemoveTicket({
    id,
    onRemoved,
}: {
    id: TicketID;
    onRemoved?: (id: TicketID) => unknown;
}) {
    return useMutation({
        mutationFn: async () => {
            const body = await SurrealInstance.opiniatedQuery<Ticket>(
                `DELETE $id`,
                {
                    id,
                }
            );

            if (body[0] && !body[0]?.error) {
                onRemoved?.(id);
            } else {
                throw new Error('Failed to remove ticket');
            }
        },
    });
}
