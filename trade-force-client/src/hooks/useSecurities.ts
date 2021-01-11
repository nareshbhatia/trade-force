import { Security } from '@trade-force/models';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiPath } from '../utils';

/**
 * Fetches securities from server
 */
const fetchSecurities = async (): Promise<Array<Security>> => {
    const resp = await axios.get(ApiPath.securities);
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
