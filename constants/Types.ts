////////////////////////
//////// USERS /////////
////////////////////////

export type ConfigID = `config:${string}`;
export type Config = {
    id: ConfigID;
    showHints: boolean;
};
export type ConfigInput = Pick<Config, 'showHints'>;

export type UserID = `user:${string}`;
export type User = {
    id: UserID;
    name: string;
    username: string;
    config: Config;
    created: Date;
    updated: Date;
    tickets?: [Ticket<unknown>];
};

export type SigninDetails = {
    username: string;
    password: string;
};

export type SignupDetails = {
    name: string;
    username: string;
    password: string;
};

////////////////////////
//////// TICKETS ///////
////////////////////////

export type TicketID = `ticket:${string}`;
export type Ticket<TAuthorType extends UserID | User = UserID> = {
    id: TicketID;
    title: string;
    body: string;
    author: TAuthorType;
    reviewers?: [TAuthorType];
    members?: [Ticket]; // use default User = UserID as type for member tickets
    created: Date;
    updated: Date;
    archived: boolean;
};

export type TicketInput = Pick<Ticket, 'title' | 'body'>;
