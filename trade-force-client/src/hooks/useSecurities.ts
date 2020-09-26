import { Security } from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches securities from server
 */
const fetchSecurities = async (): Promise<Array<Security>> => {
    const resp = await tfApi.get('/securities');
    return resp.data;
};

/**
 * Hook to fetch securities from server
 */
export const useSecurities = () => {
    return useQuery<Array<Security>, 'securities'>(
        'securities',
        fetchSecurities,
        {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    );
};
