import React, { Fragment } from 'react';
import { EntityModel } from '@http-utils/hateoas';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Order } from '@trade-force/models';
import { useUiState, useUiStateSetter } from '../../contexts';
import { useActions } from '../../hooks';
import { ActionButton } from '../ActionButton';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        marginRight: theme.spacing(1) * 1.5,
    },
    buttonLast: {
        marginRight: theme.spacing(6),
    },
}));

export const NewOrderSection = () => {
    const classes = useStyles();
    const uiState = useUiState();
    const setUiState = useUiStateSetter();

    const {
        isLoading: isActionsLoading,
        isError: isActionsError,
        data: actionsModel,
        error: actionsError,
    } = useActions();

    // Allow ErrorBoundary to handle errors
    if (isActionsError) {
        throw actionsError;
    }

    if (isActionsLoading) {
        return null;
    }

    if (actionsModel === undefined) {
        throw new Error('Error loading data');
    }

    const handleNewBuy = () => {
        const order = Order.create('buy');
        const orderModel = new EntityModel<Order>(order);
        setUiState({
            ...uiState,
            isOrderTicketOpen: true,
            targetOrder: orderModel,
        });
    };

    const handleNewSell = () => {
        const order = Order.create('sell');
        const orderModel = new EntityModel<Order>(order);
        setUiState({
            ...uiState,
            isOrderTicketOpen: true,
            targetOrder: orderModel,
        });
    };

    // Can't create orders if user doesn't have permissions
    if (!actionsModel.hasLink('createOrder')) {
        return null;
    }

    return (
        <Fragment>
            <ActionButton
                className={classes.button}
                customAction="buy"
                onClick={handleNewBuy}
            >
                New Buy
            </ActionButton>
            <ActionButton
                className={classes.buttonLast}
                customAction="sell"
                onClick={handleNewSell}
            >
                New Sell
            </ActionButton>
        </Fragment>
    );
};
