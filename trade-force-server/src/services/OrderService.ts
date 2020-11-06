import { CollectionModel, EntityModel } from '@http-utils/hateoas';
import { Order, User } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';
import { getAllowedActions } from './OrderStateTable';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class OrderService {
    public async getOrders(user: User): Promise<CollectionModel<Order>> {
        const resp = await axios.get(`${apiUrl}/orders`);
        const orders: Array<Order> = resp.data;

        // create an empty collectionModel
        const collectionModel = CollectionModel.create<Order>();

        // add entityModels
        orders.map((order) => {
            const entityModel = EntityModel.create<Order>(order);

            // add links to entityModel
            EntityModel.addLink(entityModel, 'self', `/orders/${order.id}`);
            getAllowedActions(order, user).forEach((action) => {
                EntityModel.addLink(entityModel, action, `/orders/${order.id}`);
            });

            CollectionModel.addEntityModel<Order>(collectionModel, entityModel);
        });

        // add links to collectionModel
        CollectionModel.addLink(collectionModel, 'self', '/orders');
        if (user.role === 'pm') {
            CollectionModel.addLink(collectionModel, 'createOrder', '/orders');
        }

        return collectionModel;
    }
}
