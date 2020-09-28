import { CollectionModel, Order } from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches orders from server
 */
const fetchOrders = async (): Promise<CollectionModel<Order>> => {
    const resp = await tfApi.get('/orders');

    // deserialize to a CollectionModel
    const ordersModel = new CollectionModel<Order>(resp.data._embedded);
    if (resp.data._links) {
        ordersModel.addLinks(resp.data._links);
    }

    return ordersModel;
};

/**
 * Hook to fetch orders from server
 */
export const useOrders = () => {
    return useQuery<CollectionModel<Order>, 'orders'>('orders', fetchOrders);
};
