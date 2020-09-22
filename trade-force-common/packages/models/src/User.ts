import { UserId } from './Identifiers';

export type UserRole = 'pa' | 'pm' | 'trader';

export const UserRoleLookup: { [key in UserRole]: string } = {
    pa: 'Portfolio Analyst',
    pm: 'Portfolio Manager',
    trader: 'Trader',
};

export interface User {
    id: UserId;
    email: string;
    initials: string;
    displayName: string;
    role: UserRole;
}
