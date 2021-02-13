import { CollectionModel } from '@http-utils/hateoas';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Order } from '@trade-force/models';
import axios from 'axios';
import { stringify } from 'query-string';
import { ApiPath } from '../../utils';

export const getDatasource = (): IDatasource => {
    return {
        getRows: async (params: IGetRowsParams) => {
            // create query parameters
            const { startRow, endRow, sortModel, filterModel } = params;
            const queryParams: any = {
                _start: startRow,
                _end: endRow,
            };

            // add sort parameters if applicable
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

            // add filter parameters
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

            // send request to the server
            try {
                const resp = await axios.get(
                    `${ApiPath.orders}?${stringify(queryParams)}`
                );
                const orderCollectionModel = CollectionModel.deserialize<Order>(
                    resp.data,
                    'orders'
                );
                const orderEntityModels = orderCollectionModel.collection;
                const totalCount = parseInt(resp.headers['x-total-count'], 10);
                params.successCallback(orderEntityModels, totalCount);
            } catch (error) {
                params.failCallback();
            }
        },
    };
};
