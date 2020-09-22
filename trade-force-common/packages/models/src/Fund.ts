import { FundId, UserId } from './Identifiers';

export interface Fund {
    id: FundId;
    name: string;
    manager: UserId;
}
