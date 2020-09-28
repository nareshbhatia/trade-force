import { CollectionModel, Order, User } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class OrderService {
    public async getOrders(user: User): Promise<CollectionModel<Order>> {
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
