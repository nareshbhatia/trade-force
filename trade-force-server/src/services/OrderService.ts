import {
    CollectionModel,
    EntityModel,
    Order,
    OrderCollectionModel,
    OrderEntityModel,
    User,
} from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';
import { getAllowedActions } from './OrderStateTable';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class OrderService {
    public async getOrders(user: User): Promise<OrderCollectionModel> {
        const resp = await axios.get(`${apiUrl}/orders`);
        const orders: Array<Order> = resp.data;

        // Create array of OrderEntityModel
        const orderEntityModels: Array<OrderEntityModel> = orders.map(
            (order) => {
                const orderEntityModel = new EntityModel<Order>(order);

                // Add links
                getAllowedActions(order.status, user.role).forEach((action) => {
                    orderEntityModel.addLink(action, {
                        href: `/orders/${order.id}`,
                    });
                });

                return orderEntityModel;
            }
        );

        const orderCollectionModel = new CollectionModel<OrderEntityModel>(
            orderEntityModels
        );

        // Add links
        orderCollectionModel.addLink('self', {
            href: '/orders',
        });
        if (user.role === 'pm') {
            orderCollectionModel.addLink('create', {
                href: '/orders',
            });
        }

        return orderCollectionModel;
    }
}
