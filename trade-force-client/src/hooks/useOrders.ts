import {
    CollectionModel,
    EntityModel,
    Order,
    OrderCollectionModel,
    OrderEntityModel,
} from '@trade-force/models';
import { useQuery } from 'react-query';
import { tfApi } from '../utils';

/**
 * Fetches orders from server
 */
const fetchOrders = async (): Promise<OrderCollectionModel> => {
    const resp = await tfApi.get('/orders');
    const { _embedded: embeddedOrders, _links: linksOrders } = resp.data;

    // deserialize embeddedOrders to EntityModels
    const orderEntityModels: Array<OrderEntityModel> = embeddedOrders.map(
        (embeddedOrder: any) => {
            const { _embedded: order, _links: linksOrder } = embeddedOrder;
            const orderEntityModel = new EntityModel<Order>(order);
            if (linksOrder) {
                orderEntityModel.addLinks(linksOrder);
            }
            return orderEntityModel;
        }
    );

    // compose into a CollectionModel
    const orderCollectionModel = new CollectionModel<OrderEntityModel>(
        orderEntityModels
    );
    if (linksOrders) {
        orderCollectionModel.addLinks(linksOrders);
    }

    return orderCollectionModel;
};

/**
 * Hook to fetch orders from server
 */
export const useOrders = () => {
    return useQuery<OrderCollectionModel, 'orders'>('orders', fetchOrders);
};
