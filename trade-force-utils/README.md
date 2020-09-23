# Trade Force Utilities

Miscellaneous utilities for Trade Force application, primarily to generate data.
No need to run unless new data needs to be generated.

## Usage

```bash
yarn build

# Then run any of the following commands:

# Creates securities using us-companies.json and us-shareprices.json
node dist/createSecurities.js > securities.json

# Generates orders using funds.json, securities.json & users.json
node dist/generateOrders.js > orders.json 
```
