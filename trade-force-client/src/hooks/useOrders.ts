import { Order } from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches orders from server
 */
const fetchOrders = async (): Promise<Array<Order>> => {
    const resp = await tfApi.get('/orders');
    return resp.data;
};

/**
 * Hook to fetch orders from server
 */
export const useOrders = () => {
    return useQuery<Array<Order>, 'orders'>('orders', fetchOrders);
};
