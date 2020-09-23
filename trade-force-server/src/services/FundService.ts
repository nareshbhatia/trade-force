import { Fund } from '@trade-force/models';
import { injectable } from 'inversify';
import funds from '../data/funds.json';

@injectable()
export class FundService {
    public async getFunds(): Promise<Array<Fund>> {
        return funds as Array<Fund>;
    }
}
