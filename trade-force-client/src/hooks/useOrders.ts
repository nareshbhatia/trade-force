import { useEnv } from '@react-force/core';
import { Order } from '@trade-force/models';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
import { useRootStore } from '../contexts';
import { EnvVar, USER_ID_HEADER } from '../utils';

/**
 * Fetches orders from server
 */
async function fetchOrders(
    url: string,
    userId?: string
): Promise<Array<Order>> {
    const config: AxiosRequestConfig = { headers: {} };
    if (userId) {
        config.headers[USER_ID_HEADER] = userId;
    }
    const resp = await axios.get(url, config);
    return resp.data;
}

/**
 * Hook to fetch users from server
 */
export const useOrders = () => {
    const env = useEnv();
    const apiUrl = env.get(EnvVar.API_URL);

    const rootStore = useRootStore();
    const { authStore } = rootStore;
    const user = authStore.user;

    return useQuery<Array<Order>, 'orders'>('orders', async () => {
        return fetchOrders(`${apiUrl}/orders`, user?.id);
    });
};
