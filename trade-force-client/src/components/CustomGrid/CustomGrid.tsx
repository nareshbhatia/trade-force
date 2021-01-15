import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ColDef,
    GridApi,
    GridReadyEvent,
    RowSelectedEvent,
    NavigateToNextCellParams,
    IDatasource,
} from 'ag-grid-community';
import { CellPosition } from 'ag-grid-community/dist/lib/entities/cellPosition';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';

const useStyles = makeStyles({
    grid: {
        height: '100%',
        width: '100%',
    },
});

export interface CustomGridProps {
    columnDefs: Array<ColDef>;
    datasource: IDatasource;
    onRowSelected: (event: RowSelectedEvent) => void;
}

export const CustomGrid = ({
    columnDefs,
    datasource,
    onRowSelected,
}: CustomGridProps) => {
    const classes = useStyles();

    // use useRef instead of useState to avoid a stale closure
    // see https://stackoverflow.com/questions/64071586/
    const gridApiRef = useRef<GridApi>();

    const handleGridReady = (event: GridReadyEvent) => {
        gridApiRef.current = event.api;
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

    return (
        <div className={classNames('ag-theme-alpine-dark', classes.grid)}>
            <AgGridReact
                rowSelection="single"
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    filter: true,
                }}
                columnDefs={columnDefs}
                gridOptions={{
                    rowHeight: 36,
                    suppressCellSelection: true,
                    navigateToNextCell: handleKeyboardNavigation,
                    rowModelType: 'infinite',
                    datasource,
                }}
                onGridReady={handleGridReady}
                onRowSelected={onRowSelected}
            />
        </div>
    );
};
