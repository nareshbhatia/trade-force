import { User } from '@trade-force/models';
import axios from 'axios';
import { injectable } from 'inversify';

const apiUrl = process.env.JSON_SERVER_URL;

@injectable()
export class UserService {
    public async getUsers(userId: String): Promise<Array<User>> {
        const resp = await axios.get(`${apiUrl}/users`, {
            params: {
                email: userId,
            },
        });
        return resp.data;
    }
}
