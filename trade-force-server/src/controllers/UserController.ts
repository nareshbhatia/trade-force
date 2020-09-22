import { User } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { UserService } from '../services';

@controller('/users')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpGet('/')
    public async getUsers(
        @queryParam('email') email: string
    ): Promise<Array<User>> {
        return await this.userService.getUsers(email);
    }
}
