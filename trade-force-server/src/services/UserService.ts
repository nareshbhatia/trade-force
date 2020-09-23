import { User } from '@trade-force/models';
import { injectable } from 'inversify';
import users from '../data/users.json';

@injectable()
export class UserService {
    public async getUsers(): Promise<Array<User>> {
        return users as Array<User>;
    }
}
