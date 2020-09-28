import { CollectionModel, Order, UserId } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet, requestHeaders } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { OrderService } from '../services';

const USER_ID_HEADER = 'Trade-Force-User';

@controller('/orders')
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: OrderService
    ) {}

    @httpGet('/')
    public async getOrders(
        @requestHeaders(USER_ID_HEADER) userId: UserId
    ): Promise<CollectionModel<Order>> {
        return await this.orderService.getOrders(userId);
    }
}
