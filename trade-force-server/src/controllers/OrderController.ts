import { CollectionModel } from '@http-utils/hateoas';
import { HttpStatusCode } from '@react-force/http-utils';
import { Order, UserId } from '@trade-force/models';
import express from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    requestHeaders,
    response,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { OrderService, UserService } from '../services';

const USER_ID_HEADER = 'Trade-Force-User';

@controller('/orders')
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: OrderService,
        @inject(TYPES.UserService) private userService: UserService
    ) {}

    @httpGet('/')
    public async getOrders(
        @requestHeaders(USER_ID_HEADER) userId: UserId,
        @response() res: express.Response
    ) {
        // validate that userId was sent
        if (userId === undefined) {
            res.status(HttpStatusCode.BadRequest).send();
            return;
        }

        // validate that user exists
        const user = await this.userService.getUser(userId);
        if (user === undefined) {
            res.status(HttpStatusCode.Unauthorized).send();
            return;
        }

        // fetch orders and return in response
        const collectionModel = await this.orderService.getOrders(user);
        res.status(HttpStatusCode.Ok).send(
            CollectionModel.serialize<Order>(collectionModel, 'orders')
        );
    }
}
