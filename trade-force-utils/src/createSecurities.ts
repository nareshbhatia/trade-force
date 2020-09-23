import { Security } from '@trade-force/models';
import companies from './us-companies.json';
import prices from './us-shareprices.json';

const createSecurities = () => {
    const securities: Array<Security> = [];

    companies.forEach((company) => {
        const price = prices.find((price) => price.Ticker === company.Ticker);
        if (price !== undefined) {
            securities.push({
                id: company.Ticker.toUpperCase(),
                name: company['Company Name'],
                price: price.Close as number,
            });
        }
    });

    securities.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });

    console.log(JSON.stringify(securities, null, 2));
};

createSecurities();
