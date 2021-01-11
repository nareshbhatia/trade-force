import React, { useRef } from 'react';
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
    GridApi,
    GridReadyEvent,
    RowSelectedEvent,
    NavigateToNextCellParams,
    ValueGetterParams,
} from 'ag-grid-community';
import { CellPosition } from 'ag-grid-community/dist/lib/entities/cellPosition';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { useUiState, useUiStateSetter } from '../../contexts';
import { useSecurities, useUsers } from '../../hooks';
import { PanelHeader } from '../PanelHeader';
import { getDatasource } from './getDatasource';

const useStyles = makeStyles((theme: Theme) => ({
    panelHeader: {
        height: 52,
    },
    grid: {
        height: '100%',
        width: '100%',
    },
    buyLegend: {
        backgroundColor: theme.palette.business.buyLegend,
    },
    sellLegend: {
        backgroundColor: theme.palette.business.sellLegend,
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
    const uiState = useUiState();
    const setUiState = useUiStateSetter();

    // use useRef instead of useState to avoid a stale closure
    // see https://stackoverflow.com/questions/64071586/
    const gridApiRef = useRef<GridApi>();

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
        gridApiRef.current = event.api;
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

    const handleKeyboardNavigation = (
        params: NavigateToNextCellParams
    ): CellPosition => {
        const gridApi = gridApiRef.current;
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
                return suggestedNextCell ? suggestedNextCell : previousCell;
            case KEY_UP:
                previousCell = params.previousCellPosition;
                // set selected cell on current cell - 1
                gridApi.forEachNode(function (node) {
                    if (previousCell.rowIndex - 1 === node.rowIndex) {
                        node.setSelected(true);
                    }
                });
                return suggestedNextCell ? suggestedNextCell : previousCell;
            case KEY_LEFT:
            case KEY_RIGHT:
                return suggestedNextCell ? suggestedNextCell : previousCell;
            default:
                throw new Error('This should never happen!');
        }
    };

    const sideLegendCellClass = (params: CellClassParams) => {
        if (params.data === undefined) {
            return '';
        }
        return params.data.entity.side === 'buy'
            ? classes.buyLegend
            : classes.sellLegend;
    };

    const sideCellClass = (params: CellClassParams) => {
        if (params.data === undefined) {
            return '';
        }
        return [
            classes.side,
            params.data.entity.side === 'buy'
                ? classes.buyText
                : classes.sellText,
        ];
    };

    const sideValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        return OrderSideLookup[params.data.entity.side as Side];
    };

    const securityNameValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        const id = params.data.entity.secId;
        const security = securities?.find((security) => security.id === id);
        return security !== undefined ? security.name : id;
    };

    const orderTypeValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        return OrderTypeLookup[params.data.entity.type as OrderType];
    };

    const orderStatusValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        return OrderStatusLookup[params.data.entity.status as OrderStatus];
    };

    const pmValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        const id = params.data.entity.managerId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    const paValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        const id = params.data.entity.analystId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    const traderValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        const id = params.data.entity.traderId;
        const user = users?.find((user) => user.id === id);
        return user !== undefined ? user.initials : id;
    };

    // Allow ErrorBoundary to handle errors
    if (isSecuritiesError || isUsersError) {
        throw new Error('Error loading data');
    }

    if (isSecuritiesLoading || isUsersLoading) {
        return null;
    }

    if (securities === undefined || users === undefined) {
        throw new Error('Error loading data');
    }

    return (
        <VerticalContainer>
            <PanelHeader className={classes.panelHeader}>Orders</PanelHeader>
            <div className={classNames('ag-theme-alpine-dark', classes.grid)}>
                <AgGridReact
                    rowSelection={'single'}
                    defaultColDef={{
                        resizable: true,
                        sortable: true,
                        filter: true,
                    }}
                    gridOptions={{
                        rowHeight: 36,
                        suppressCellSelection: true,
                        navigateToNextCell: handleKeyboardNavigation,
                        rowModelType: 'infinite',
                        datasource: getDatasource(),
                    }}
                    onGridReady={handleGridReady}
                    onRowSelected={handleRowSelected}
                >
                    <AgGridColumn
                        width={12}
                        minWidth={12}
                        cellClass={sideLegendCellClass}
                        // padding must be set using cellStyle, not cellClass
                        cellStyle={{ padding: 0 }}
                    />
                    <AgGridColumn
                        field="entity.side"
                        headerName="Side"
                        width={90}
                        cellClass={sideCellClass}
                        valueGetter={sideValueGetter}
                    />
                    <AgGridColumn
                        field="entity.secId"
                        headerName="Symbol"
                        width={100}
                        cellClass={classes.symbol}
                    />
                    <AgGridColumn
                        field="entity.secId"
                        headerName="Name"
                        width={300}
                        valueGetter={securityNameValueGetter}
                    />
                    <AgGridColumn
                        field="entity.quantity"
                        headerName="Qty"
                        width={90}
                    />
                    <AgGridColumn
                        field="entity.executed"
                        headerName="Exec"
                        width={90}
                    />
                    <AgGridColumn
                        field="entity.type"
                        headerName="Type"
                        width={100}
                        valueGetter={orderTypeValueGetter}
                    />
                    <AgGridColumn
                        field="entity.status"
                        headerName="Status"
                        width={160}
                        valueGetter={orderStatusValueGetter}
                    />
                    <AgGridColumn
                        field="entity.fundId"
                        headerName="Fund"
                        width={100}
                    />
                    <AgGridColumn
                        field="entity.managerId"
                        headerName="PM"
                        width={80}
                        valueGetter={pmValueGetter}
                    />
                    <AgGridColumn
                        field="entity.analystId"
                        headerName="PA"
                        width={80}
                        valueGetter={paValueGetter}
                    />
                    <AgGridColumn
                        field="entity.traderId"
                        headerName="TR"
                        width={80}
                        valueGetter={traderValueGetter}
                    />
                </AgGridReact>
            </div>
        </VerticalContainer>
    );
};
