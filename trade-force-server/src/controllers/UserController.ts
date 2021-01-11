import { User } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../constants';
import { UserService } from '../services';

@controller('/users')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpGet('/')
    public async getUsers(): Promise<Array<User>> {
        return await this.userService.getUsers();
    }
}
