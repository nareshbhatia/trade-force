import { User } from '@trade-force/models';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiPath } from '../utils';

/**
 * Fetches users from server
 */
const fetchUsers = async (): Promise<Array<User>> => {
    // get users
    const resp = await axios.get(ApiPath.users);
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
