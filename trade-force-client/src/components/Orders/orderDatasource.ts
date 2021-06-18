import { CollectionModel } from '@http-utils/hateoas';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Order } from '@trade-force/models';
import axios from 'axios';
import { stringify } from 'query-string';
import { ApiPath } from '../../utils';

export const orderDatasource: IDatasource = {
    getRows: async (params: IGetRowsParams) => {
        // create query parameters from supplied params
        const { startRow, endRow, sortModel, filterModel } = params;

        // Add _start & _end params
        // Example: _start=0 & _end=100
        const queryParams: any = {
            _start: startRow,
            _end: endRow,
        };

        // Add sort parameters if applicable
        // Example: _sort=secId,quantity & _order=asc,asc
        if (sortModel.length > 0) {
            queryParams['_sort'] = sortModel
                // sortSpec.colId example: "entity.side"
                // remove "entity." prefix
                .map((sortSpec: any) => sortSpec.colId.substr(7))
                .join(',');

            queryParams['_order'] = sortModel
                .map((sortSpec: any) => sortSpec.sort)
                .join(',');
        }

        // Add filter parameters
        // Example: secId=TSLA & side=buy
        // filterModel examples:
        //   {"entity.secId":{"filterType":"text","type":"contains","filter":"TSLA"}}
        //   {"entity.side":{"values":["buy"],"filterType":"set"}}
        Object.keys(filterModel).forEach((key) => {
            const field = key.substr(7);
            switch (filterModel[key].filterType) {
                case 'text':
                    queryParams[field] = filterModel[key].filter;
                    break;
                case 'set':
                    queryParams[field] = filterModel[key].values;
                    break;
            }
        });

        try {
            // Send request to the server
            const resp = await axios.get(
                `${ApiPath.orders}?${stringify(queryParams)}`
            );

            // Convert response to an array of EntityModels
            const orderCollectionModel = CollectionModel.deserialize<Order>(
                resp.data,
                'orders'
            );
            const orderEntityModels = orderCollectionModel.collection;
            const totalCount = parseInt(resp.headers['x-total-count'], 10);

            // Return result to ag-Grid
            params.successCallback(orderEntityModels, totalCount);
        } catch (error) {
            params.failCallback();
        }
    },
};
