import { Security } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../constants';
import { SecurityService } from '../services';

@controller('/securities')
export class SecurityController {
    constructor(
        @inject(TYPES.SecurityService) private securityService: SecurityService
    ) {}

    @httpGet('/')
    public async getSecurities(): Promise<Array<Security>> {
        return await this.securityService.getSecurities();
    }
}
