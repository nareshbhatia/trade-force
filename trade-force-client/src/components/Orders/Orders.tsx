import React from 'react';
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
    ColDef,
    RowSelectedEvent,
    ValueFormatterParams,
    ValueGetterParams,
} from 'ag-grid-community';
import { useUiState, useUiStateSetter } from '../../contexts';
import { useSecurities, useUsers } from '../../hooks';
import { CustomGrid } from '../CustomGrid';
import { PanelHeader } from '../PanelHeader';
import { orderDatasource } from './orderDatasource';

const useStyles = makeStyles((theme: Theme) => ({
    panelHeader: {
        height: 52,
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

    const handleRowSelected = (event: RowSelectedEvent) => {
        if (event.node.isSelected()) {
            setUiState({
                ...uiState,
                isOrderTicketOpen: true,
                targetOrder: event.node.data,
            });
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

    const sideValueFormatter = (params: ValueFormatterParams) => {
        if (params.value === undefined) {
            return null;
        }
        return OrderSideLookup[params.value as Side];
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

    const orderTypeValueFormatter = (params: ValueFormatterParams) => {
        if (params.value === undefined) {
            return null;
        }
        return OrderTypeLookup[params.value as OrderType];
    };

    const orderStatusValueGetter = (params: ValueGetterParams) => {
        if (params.data === undefined) {
            return null;
        }
        return OrderStatusLookup[params.data.entity.status as OrderStatus];
    };

    const orderStatusValueFormatter = (params: ValueFormatterParams) => {
        if (params.value === undefined) {
            return null;
        }
        return OrderStatusLookup[params.value as OrderStatus];
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

    const columnDefs: Array<ColDef> = [
        {
            width: 12,
            minWidth: 12,
            cellClass: sideLegendCellClass,
            // padding must be set using cellStyle, not cellClass
            cellStyle: { padding: 0 },
        },
        {
            field: 'entity.side',
            headerName: 'Side',
            width: 90,
            cellClass: sideCellClass,
            valueGetter: sideValueGetter,
            filter: 'agSetColumnFilter',
            filterParams: {
                values: Object.keys(OrderSideLookup),
                defaultToNothingSelected: true,
                valueFormatter: sideValueFormatter,
            },
        },
        {
            field: 'entity.secId',
            headerName: 'Symbol',
            width: 100,
            cellClass: classes.symbol,
        },
        {
            field: 'entity.secId',
            headerName: 'Name',
            width: 300,
            // can't sort or filter by name because it is not a property of order
            sortable: false,
            filter: false,
            menuTabs: [],
            valueGetter: securityNameValueGetter,
        },
        {
            field: 'entity.quantity',
            headerName: 'Qty',
            width: 90,
        },
        {
            field: 'entity.executed',
            headerName: 'Exec',
            width: 90,
        },
        {
            field: 'entity.type',
            headerName: 'Type',
            width: 100,
            valueGetter: orderTypeValueGetter,
            filter: 'agSetColumnFilter',
            filterParams: {
                values: Object.keys(OrderTypeLookup),
                defaultToNothingSelected: true,
                valueFormatter: orderTypeValueFormatter,
            },
        },
        {
            field: 'entity.status',
            headerName: 'Status',
            width: 160,
            valueGetter: orderStatusValueGetter,
            filter: 'agSetColumnFilter',
            filterParams: {
                values: Object.keys(OrderStatusLookup),
                defaultToNothingSelected: true,
                valueFormatter: orderStatusValueFormatter,
            },
        },
        {
            field: 'entity.fundId',
            headerName: 'Fund',
            width: 100,
        },
        {
            field: 'entity.managerId',
            headerName: 'PM',
            width: 80,
            valueGetter: pmValueGetter,
        },
        {
            field: 'entity.analystId',
            headerName: 'PA',
            width: 80,
            valueGetter: paValueGetter,
        },
        {
            field: 'entity.traderId',
            headerName: 'TR',
            width: 80,
            valueGetter: traderValueGetter,
        },
    ];

    return (
        <VerticalContainer>
            <PanelHeader className={classes.panelHeader}>Orders</PanelHeader>
            <CustomGrid
                columnDefs={columnDefs}
                datasource={orderDatasource}
                onRowSelected={handleRowSelected}
            />
        </VerticalContainer>
    );
};
