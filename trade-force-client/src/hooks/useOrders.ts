import { useEnv } from '@react-force/core';
import { Order } from '@trade-force/models';
import axios from 'axios';
import { useQuery } from 'react-query';
import { EnvVar } from '../utils';

/**
 * Fetches orders from server
 * @param url
 */
async function fetchOrders(url: string): Promise<Array<Order>> {
    const resp = await axios.get(url);
    return resp.data;
}

/**
 * Hook to fetch users from server
 */
export const useOrders = () => {
    const env = useEnv();
    const apiUrl = env.get(EnvVar.API_URL);

    return useQuery<Array<Order>, 'orders'>('orders', async () => {
        return fetchOrders(`${apiUrl}/orders`);
    });
};
