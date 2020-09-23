import { Order } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class OrderService {
    public async getOrders(): Promise<Array<Order>> {
        const resp = await axios.get(`${apiUrl}/orders`);
        return resp.data;
    }
}
