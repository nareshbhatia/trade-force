import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { useOrders } from '../../hooks';
import { PanelHeader } from '../PanelHeader';
// import 'ag-grid-enterprise';

const useStyles = makeStyles((theme: Theme) => ({
    panelHeader: {
        height: 52,
    },
    grid: {
        height: '100%',
        width: '100%',
    },
}));

export const Orders = () => {
    const classes = useStyles();
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | undefined>();

    const { isLoading, isError, data: orders, error } = useOrders();

    const handleGridReady = (event: GridReadyEvent) => {
        setGridApi(event.api);
        setGridColumnApi(event.columnApi);
    };
    const handleRowSelected = () => {};

    // Allow ErrorBoundary to handle errors
    if (isError) {
        throw error;
    }

    if (isLoading || orders === undefined) {
        return null;
    }

    return (
        <VerticalContainer>
            <PanelHeader className={classes.panelHeader}>Orders</PanelHeader>
            <div className={classNames('ag-theme-alpine-dark', classes.grid)}>
                <AgGridReact
                    onGridReady={handleGridReady}
                    onRowSelected={handleRowSelected}
                    rowData={orders}
                    defaultColDef={{
                        resizable: true,
                        sortable: true,
                        filter: true,
                    }}
                >
                    <AgGridColumn field="side" width={80} />
                    <AgGridColumn
                        field="secId"
                        headerName="Symbol"
                        width={100}
                    />
                    <AgGridColumn field="secId" headerName="Name" width={150} />
                    <AgGridColumn
                        field="quantity"
                        headerName="Qty"
                        width={90}
                    />
                    <AgGridColumn
                        field="executed"
                        headerName="Exec"
                        width={90}
                    />
                    <AgGridColumn field="type" width={100} />
                    <AgGridColumn field="status" width={150} />
                    <AgGridColumn
                        field="fundId"
                        headerName="Fund"
                        width={100}
                    />
                    <AgGridColumn
                        field="managerId"
                        headerName="PM"
                        width={80}
                    />
                    <AgGridColumn
                        field="analystId"
                        headerName="AN"
                        width={80}
                    />
                    <AgGridColumn field="traderId" headerName="TR" width={80} />
                </AgGridReact>
            </div>
        </VerticalContainer>
    );
};
