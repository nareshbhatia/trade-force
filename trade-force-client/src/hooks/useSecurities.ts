import { useEnv } from '@react-force/core';
import { Security } from '@trade-force/models';
import axios from 'axios';
import { useQuery } from 'react-query';
import { EnvVar } from '../utils';

/**
 * Fetches securities from server
 * @param url
 */
async function fetchSecurities(url: string): Promise<Array<Security>> {
    const resp = await axios.get(url);
    return resp.data;
}

/**
 * Hook to fetch users from server
 */
export const useSecurities = () => {
    const env = useEnv();
    const apiUrl = env.get(EnvVar.API_URL);

    return useQuery<Array<Security>, 'securities'>('securities', async () => {
        return fetchSecurities(`${apiUrl}/securities`);
    });
};
