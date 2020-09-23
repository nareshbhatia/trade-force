import { Order } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { OrderService } from '../services';

@controller('/orders')
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: OrderService
    ) {}

    @httpGet('/')
    public async getOrders(): Promise<Array<Order>> {
        return await this.orderService.getOrders();
    }
}
