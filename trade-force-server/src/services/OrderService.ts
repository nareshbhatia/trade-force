import { CollectionModel, Order, UserId } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';
// TODO: get users using userService
import users from '../data/users.json';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class OrderService {
    public async getOrders(userId: UserId): Promise<CollectionModel<Order>> {
        // Make sure user is defined
        if (userId === undefined) {
            return new CollectionModel<Order>([]);
        }
        const user = users.find((user) => user.id === userId);
        if (user === undefined) {
            return new CollectionModel<Order>([]);
        }

        const resp = await axios.get(`${apiUrl}/orders`);
        const orders = resp.data;
        const orderCollectionModel = new CollectionModel<Order>(orders);

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
