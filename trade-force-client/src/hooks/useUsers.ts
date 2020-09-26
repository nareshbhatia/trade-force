import { User } from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches users from server
 */
const fetchUsers = async (): Promise<Array<User>> => {
    // get users
    const resp = await tfApi.get('/users');
    const users: Array<User> = resp.data;

    // Sort by role then display name
    users.sort((a, b) => {
        if (a.role < b.role) return -1;
        if (a.role > b.role) return 1;
        if (a.displayName < b.displayName) return -1;
        if (a.displayName > b.displayName) return 1;
        return 0;
    });

    return users;
};

/**
 * Hook to fetch users from server
 */
export const useUsers = () => {
    return useQuery<Array<User>, 'users'>('users', fetchUsers, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
