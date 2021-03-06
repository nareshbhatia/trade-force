import { HttpStatusCode } from '@http-utils/core';
import { UserId } from '@trade-force/models';
import express from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    request,
    requestHeaders,
    response,
} from 'inversify-express-utils';
import { TYPES, USER_ID_HEADER } from '../constants';
import { OrderService, UserService } from '../services';

@controller('/orders')
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: OrderService,
        @inject(TYPES.UserService) private userService: UserService
    ) {}

    @httpGet('/')
    public async getOrders(
        @request() req: express.Request,
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

        // extract query parameters from url
        const url = req.originalUrl;
        const i = url.indexOf('?');
        const queryParam = i >= 0 ? url.substr(i + 1) : '';

        // fetch orders (passing query parameters) and return in response
        const orderCollectionWrapper = await this.orderService.getOrders(
            user,
            queryParam
        );
        const { collectionModel, totalCount } = orderCollectionWrapper;
        res.status(HttpStatusCode.Ok)
            .header('X-Total-Count', totalCount)
            .send(collectionModel.serialize('orders'));
    }
}
