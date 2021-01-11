import { HttpStatusCode } from '@http-utils/core';
import { EntityModel } from '@http-utils/hateoas';
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
import { UserService } from '../services';

@controller('/actions')
export class ActionController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpGet('/')
    public async getActions(
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

        const actionModel = new EntityModel<Object>({});
        if (user.role === 'pm') {
            actionModel.addLink('createOrder', '/orders');
        }

        res.status(HttpStatusCode.Ok).send(actionModel.serialize());
    }
}
