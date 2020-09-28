import { User, UserId } from '@trade-force/models';
import { injectable } from 'inversify';
import users from '../data/users.json';

@injectable()
export class UserService {
    public async getUsers(): Promise<Array<User>> {
        return users as Array<User>;
    }

    public async getUser(userId: UserId): Promise<User | undefined> {
        return (users as Array<User>).find((user) => user.id === userId);
    }
}
