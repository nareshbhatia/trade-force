import React, { useState } from 'react';
import { VerticalContainer } from '@react-force/core';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useOrders } from '../../hooks';
import { PanelHeader } from '../PanelHeader';
import 'ag-grid-enterprise';

export const Orders = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const { isLoading, isError, data: orders, error } = useOrders();

    // Allow ErrorBoundary to handle errors
    if (isError) {
        throw error;
    }

    if (isLoading || orders === undefined) {
        return null;
    }

    return (
        <VerticalContainer>
            <PanelHeader>Orders</PanelHeader>
            <div
                className="ag-theme-alpine-dark"
                style={{ height: 400, width: 600 }}
            >
                <AgGridReact rowData={orders}>
                    <AgGridColumn field="side" sortable={true} filter={true} />
                    <AgGridColumn field="secId" sortable={true} filter={true} />
                    <AgGridColumn
                        field="quantity"
                        sortable={true}
                        filter={true}
                    />
                    <AgGridColumn
                        field="executed"
                        sortable={true}
                        filter={true}
                    />
                    <AgGridColumn field="type" sortable={true} filter={true} />
                    <AgGridColumn
                        field="status"
                        sortable={true}
                        filter={true}
                    />
                    <AgGridColumn
                        field="fundId"
                        sortable={true}
                        filter={true}
                    />
                </AgGridReact>
            </div>
        </VerticalContainer>
    );
};
