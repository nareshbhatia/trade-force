import { UserId } from './Identifiers';

export type UserRole = 'pa' | 'pm' | 'trader';

export interface User {
    id: UserId;
    displayName: string;
    initials: string;
    role: UserRole;
}

export const UserRoleLookup: { [key in UserRole]: string } = {
    pa: 'Portfolio Analyst',
    pm: 'Portfolio Manager',
    trader: 'Trader',
};
