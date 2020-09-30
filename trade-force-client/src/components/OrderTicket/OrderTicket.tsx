import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { Order, OrderSideLookup } from '@trade-force/models';
import classNames from 'classnames';
import { useUiState, useUiStateSetter } from '../../contexts';
import { PanelHeader } from '../PanelHeader';
import { OrderForm } from './OrderForm';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightMedium,
        margin: 0,
        textTransform: 'uppercase',
    },
    buyTicket: {
        backgroundColor: theme.palette.business.buyBackground,
    },
    sellTicket: {
        backgroundColor: theme.palette.business.sellBackground,
    },
    buyText: {
        color: theme.palette.business.buyText,
    },
    sellText: {
        color: theme.palette.business.sellText,
    },
}));

export const OrderTicket = () => {
    const classes = useStyles();
    const uiState = useUiState();
    const setUiState = useUiStateSetter();

    const { targetOrder: orderModel } = uiState;
    if (orderModel === undefined) {
        return null;
    }

    const order = orderModel.getContent();
    const { side } = order;

    const ticketClass = side === 'buy' ? classes.buyTicket : classes.sellTicket;
    const titleClass = classNames(
        classes.title,
        side === 'buy' ? classes.buyText : classes.sellText
    );
    const title = OrderSideLookup[order.side];

    const handleSave = async (order: Order) => {
        console.log(order);
    };

    const handleClose = async () => {
        setUiState({
            ...uiState,
            isOrderTicketOpen: false,
            targetOrder: undefined,
        });
    };

    return (
        <VerticalContainer>
            <PanelHeader showCloseButton onClose={handleClose}>
                Order Ticket
            </PanelHeader>
            <VerticalContainer px={2} py={1} className={ticketClass}>
                <h1 className={titleClass}>{title}</h1>
                {/* Create a new instance of the form if order changes */}
                <OrderForm key={order.id} order={order} onSave={handleSave} />
            </VerticalContainer>
        </VerticalContainer>
    );
};
