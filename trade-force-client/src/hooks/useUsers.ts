import { useEnv } from '@react-force/core';
import { User } from '@trade-force/models';
import axios from 'axios';
import { useQuery } from 'react-query';
import { EnvVar } from '../utils';

/**
 * Fetches users from server
 * @param url
 */
async function fetchUsers(url: string): Promise<Array<User>> {
    const resp = await axios.get(url);
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
}

/**
 * Hook to fetch users from server
 */
export const useUsers = () => {
    const env = useEnv();
    const apiUrl = env.get(EnvVar.API_URL);

    return useQuery<Array<User>, 'users'>(
        'users',
        async () => {
            return fetchUsers(`${apiUrl}/users`);
        },
        {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    );
};
