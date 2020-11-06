import { CollectionModel } from '@http-utils/hateoas';
import { Order } from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches orders from server
 */
const fetchOrders = async (): Promise<CollectionModel<Order>> => {
    const resp = await tfApi.get('/orders');
    return CollectionModel.deserialize<Order>(resp.data, 'orders');
};

/**
 * Hook to fetch orders from server
 */
export const useOrders = () => {
    return useQuery<CollectionModel<Order>, 'orders'>('orders', fetchOrders);
};
