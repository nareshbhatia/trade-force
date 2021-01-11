import { CollectionModel } from '@http-utils/hateoas';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Order } from '@trade-force/models';
import axios from 'axios';
import { stringify } from 'query-string';
import { ApiPath } from '../../utils';

export const getDatasource = (): IDatasource => {
    return {
        getRows: async (params: IGetRowsParams) => {
            const { startRow, endRow } = params;
            const queryParams = {
                _start: startRow,
                _end: endRow,
            };
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
