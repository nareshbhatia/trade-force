import React, { Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { newOrder, User } from '@trade-force/models';
import { useUiState, useUiStateSetter } from '../../contexts';
import { ActionButton } from '../ActionButton';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        marginRight: theme.spacing(1) * 1.5,
    },
    buttonLast: {
        marginRight: theme.spacing(6),
    },
}));

export interface NewOrderSectionProps {
    user?: User;
}

export const NewOrderSection = ({ user }: NewOrderSectionProps) => {
    const classes = useStyles();
    const uiState = useUiState();
    const setUiState = useUiStateSetter();

    const handleNewBuy = () => {
        setUiState({
            ...uiState,
            isOrderTicketOpen: true,
            targetOrder: newOrder('buy'),
        });
    };

    const handleNewSell = () => {
        setUiState({
            ...uiState,
            isOrderTicketOpen: true,
            targetOrder: newOrder('sell'),
        });
    };

    // TODO: add condition for user is allowed to create orders
    // Can't create orders if user is not defined
    if (user === undefined) {
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
