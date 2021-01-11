import { CollectionModel, EntityModel } from '@http-utils/hateoas';
import { Order, User } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';
import { getAllowedActions } from './OrderStateTable';

const apiUrl = process.env.JSON_SERVER_URL;

export interface OrderCollectionWrapper {
    collectionModel: CollectionModel<Order>;
    totalCount: string;
}

@injectable()
export class OrderService {
    public async getOrders(
        user: User,
        queryParam: string
    ): Promise<OrderCollectionWrapper> {
        const resp = await axios.get(`${apiUrl}/orders?${queryParam}`);
        const orders: Array<Order> = resp.data;
        const totalCount = resp.headers['x-total-count'];

        // create an empty collectionModel
        const collectionModel = new CollectionModel<Order>();

        // add entityModels
        orders.map((order) => {
            const entityModel = new EntityModel<Order>(order);

            // add links to entityModel
            entityModel.addLink('self', `/orders/${order.id}`);
            getAllowedActions(order, user).forEach((action) => {
                entityModel.addLink(action, `/orders/${order.id}`);
            });

            collectionModel.addEntityModel(entityModel);
        });

        // add links to collectionModel
        collectionModel.addLink('self', '/orders');

        return {
            collectionModel,
            totalCount,
        };
    }
}
