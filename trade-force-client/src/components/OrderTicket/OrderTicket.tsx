import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { Order, OrderSideLookup } from '@trade-force/models';
import { useUiState, useUiStateSetter } from '../../contexts';
import { PanelHeader } from '../PanelHeader';
import { Title } from '../Text';
import { OrderForm } from './OrderForm';
import { OrderView } from './OrderView';

const useStyles = makeStyles((theme: Theme) => ({
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

    const order = orderModel.entity;
    const { side } = order;

    const ticketClass = side === 'buy' ? classes.buyTicket : classes.sellTicket;
    const titleClass = side === 'buy' ? classes.buyText : classes.sellText;
    const title = OrderSideLookup[order.side];

    const editable =
        order.status === 'new' || orderModel.hasLink('updateOrder');

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
                <Title className={titleClass}>{title}</Title>
                {/* Create a new instance if order changes */}
                {editable ? (
                    <OrderForm
                        key={order.id}
                        order={order}
                        onSave={handleSave}
                    />
                ) : (
                    <OrderView key={order.id} orderModel={orderModel} />
                )}
            </VerticalContainer>
        </VerticalContainer>
    );
};
