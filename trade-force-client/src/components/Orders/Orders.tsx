import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import {
    OrderSideLookup,
    OrderStatus,
    OrderStatusLookup,
    OrderType,
    OrderTypeLookup,
    Side,
} from '@trade-force/models';
import {
    CellClassParams,
    ColumnApi,
    GridApi,
    GridReadyEvent,
    RowSelectedEvent,
    NavigateToNextCellParams,
    ValueGetterParams,
} from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { useUiState, useUiStateSetter } from '../../contexts';
import { useOrders, useSecurities, useUsers } from '../../hooks';
import { PanelHeader } from '../PanelHeader';
import 'ag-grid-enterprise';
import { CellPosition } from 'ag-grid-community/dist/lib/entities/cellPosition';

const useStyles = makeStyles((theme: Theme) => ({
    panelHeader: {
        height: 52,
    },
    grid: {
        height: '100%',
        width: '100%',
    },
    side: {
        color: theme.palette.text.emphasis,
        fontSize: 16,
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
    },
    buyText: {
        color: theme.palette.business.buyText,
    },
    sellText: {
        color: theme.palette.business.sellText,
    },
    symbol: {
        color: theme.palette.text.emphasis,
        fontFamily: 'Source Sans Pro',
        fontSize: 16,
        fontWeight: 600,
    },
}));

export const Orders = () => {
    const classes = useStyles();
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | undefined>();
    const uiState = useUiState();
    const setUiState = useUiStateSetter();

    const {
        isLoading: isOrdersLoading,
        isError: isOrdersError,
        data: orders,
    } = useOrders();
    const {
        isLoading: isSecuritiesLoading,
        isError: isSecuritiesError,
        data: securities,
    } = useSecurities();
    const {
        isLoading: isUsersLoading,
        isError: isUsersError,
        data: users,
    } = useUsers();

    const handleGridReady = (event: GridReadyEvent) => {
        setGridApi(event.api);
        setGridColumnApi(event.columnApi);
    };

    const handleRowSelected = (event: RowSelectedEvent) => {
        if (event.node.isSelected()) {
            setUiState({
                ...uiState,
                isOrderTicketOpen: true,
                targetOrder: event.node.data,
            });
        }
    };

    const sideCellClass = (params: CellClassParams) => {
        return [
            classes.side,
            params.data.side === 'buy' ? classes.buyText : classes.sellText,
        ];
    };

    const sideValueGetter = (params: ValueGetterParams) => {
        return OrderSideLookup[params.data.side as Side];
    };

    const securityNameValueGetter = (params: ValueGetterParams) => {
        const id = params.data.secId;
        const security = securities?.find((security) => security.id === id);
        return security !== undefined ? security.name : id;
    };

    const orderTypeValueGetter = (params: ValueGetterParams) => {
        return OrderTypeLookup[params.data.type as OrderType];
    };

    const orderStatusValueGetter = (params: ValueGetterParams) => {
        return OrderStatusLookup[params.data.status as OrderStatus];
    };

    const pmValueGetter = (params: ValueGetterParams) => {
        const id = params.data.managerId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    const paValueGetter = (params: ValueGetterParams) => {
        const id = params.data.analystId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    const traderValueGetter = (params: ValueGetterParams) => {
        const id = params.data.traderId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    const keyboardNavigation = (
        params: NavigateToNextCellParams
    ): CellPosition => {
        if (gridApi === undefined) {
            throw new Error('This should never happen!');
        }

        let previousCell = params.previousCellPosition;
        const suggestedNextCell = params.nextCellPosition;

        const KEY_UP = 38;
        const KEY_DOWN = 40;
        const KEY_LEFT = 37;
        const KEY_RIGHT = 39;

        switch (params.key) {
            case KEY_DOWN:
                previousCell = params.previousCellPosition;
                // set selected cell on current cell + 1
                gridApi.forEachNode(function (node) {
                    if (previousCell.rowIndex + 1 === node.rowIndex) {
                        node.setSelected(true);
                    }
                });
                return suggestedNextCell;
            case KEY_UP:
                previousCell = params.previousCellPosition;
                // set selected cell on current cell - 1
                gridApi.forEachNode(function (node) {
                    if (previousCell.rowIndex - 1 === node.rowIndex) {
                        node.setSelected(true);
                    }
                });
                return suggestedNextCell;
            case KEY_LEFT:
            case KEY_RIGHT:
                return suggestedNextCell;
            default:
                throw new Error('This should never happen!');
        }
    };

    // Allow ErrorBoundary to handle errors
    if (isOrdersError || isSecuritiesError || isUsersError) {
        throw new Error('Error loading data');
    }

    if (isOrdersLoading || isSecuritiesLoading || isUsersLoading) {
        return null;
    }

    if (
        orders === undefined ||
        securities === undefined ||
        users === undefined
    ) {
        throw new Error('Error loading data');
    }

    return (
        <VerticalContainer>
            <PanelHeader className={classes.panelHeader}>Orders</PanelHeader>
            <div className={classNames('ag-theme-alpine-dark', classes.grid)}>
                <AgGridReact
                    rowData={orders}
                    rowSelection={'single'}
                    defaultColDef={{
                        resizable: true,
                        sortable: true,
                        filter: true,
                    }}
                    gridOptions={{
                        rowHeight: 36,
                        suppressCellSelection: true,
                        navigateToNextCell: keyboardNavigation,
                    }}
                    onGridReady={handleGridReady}
                    onRowSelected={handleRowSelected}
                >
                    <AgGridColumn
                        field="side"
                        width={90}
                        cellClass={sideCellClass}
                        valueGetter={sideValueGetter}
                    />
                    <AgGridColumn
                        field="secId"
                        headerName="Symbol"
                        width={100}
                        cellClass={classes.symbol}
                    />
                    <AgGridColumn
                        field="secId"
                        headerName="Name"
                        width={300}
                        valueGetter={securityNameValueGetter}
                    />
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
                    <AgGridColumn
                        field="type"
                        width={100}
                        valueGetter={orderTypeValueGetter}
                    />
                    <AgGridColumn
                        field="status"
                        width={160}
                        valueGetter={orderStatusValueGetter}
                    />
                    <AgGridColumn
                        field="fundId"
                        headerName="Fund"
                        width={100}
                    />
                    <AgGridColumn
                        field="managerId"
                        headerName="PM"
                        width={80}
                        valueGetter={pmValueGetter}
                    />
                    <AgGridColumn
                        field="analystId"
                        headerName="PA"
                        width={80}
                        valueGetter={paValueGetter}
                    />
                    <AgGridColumn
                        field="traderId"
                        headerName="TR"
                        width={80}
                        valueGetter={traderValueGetter}
                    />
                </AgGridReact>
            </div>
        </VerticalContainer>
    );
};
