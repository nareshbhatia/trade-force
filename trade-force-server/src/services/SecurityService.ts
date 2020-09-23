import { Security } from '@trade-force/models';
import { injectable } from 'inversify';
import securities from '../data/securities.json';

@injectable()
export class SecurityService {
    public async getSecurities(): Promise<Array<Security>> {
        return securities as Array<Security>;
    }
}
