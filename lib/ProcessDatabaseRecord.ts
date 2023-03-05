import { Ticket, User, UserID } from '../constants/Types';

// Process stuff like dates from the database to JS date objects, properly format data.

export function processUserRecord(user: User) {
    return {
        ...user,
        created: new Date(user.created),
        updated: new Date(user.updated),
    };
}

export function processTicketRecord<TAuthorType extends UserID | User = UserID>(
    ticket: Ticket<TAuthorType>
): Ticket<TAuthorType> {
    return {
        ...ticket,
        created: new Date(ticket.created),
        updated: new Date(ticket.updated),
        author:
            typeof ticket.author == 'object'
                ? {
                      ...ticket.author,
                      created: new Date(ticket.author.created),
                      updated: new Date(ticket.author.updated),
                  }
                : ticket.author,
    };
}
