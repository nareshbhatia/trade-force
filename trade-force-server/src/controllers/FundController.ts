import { Fund } from '@trade-force/models';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../constants';
import { FundService } from '../services';

@controller('/funds')
export class FundController {
    constructor(@inject(TYPES.FundService) private fundService: FundService) {}

    @httpGet('/')
    public async getFunds(): Promise<Array<Fund>> {
        return await this.fundService.getFunds();
    }
}
