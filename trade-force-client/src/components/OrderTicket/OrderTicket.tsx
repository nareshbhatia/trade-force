import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { newOrder, Order } from '@trade-force/models';
import classNames from 'classnames';
import { PanelHeader } from '../PanelHeader';
import { OrderForm } from './OrderForm';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightMedium,
        margin: 0,
        marginBottom: theme.spacing(1) * 1.5,
        textTransform: 'uppercase',
    },
    buyTicket: {
        backgroundColor: theme.palette.business.buyBackground,
    },
    sellTicket: {
        backgroundColor: theme.palette.business.sellBackground,
    },
    buyTitle: {
        color: theme.palette.business.buyText,
    },
    sellTitle: {
        color: theme.palette.business.sellText,
    },
}));

export const OrderTicket = () => {
    const classes = useStyles();
    const order = newOrder('buy');
    const { side } = order;

    const ticketClass = side === 'buy' ? classes.buyTicket : classes.sellTicket;
    const titleClass = classNames(
        classes.title,
        side === 'buy' ? classes.buyTitle : classes.sellTitle
    );
    const title = side === 'buy' ? 'Buy' : 'Sell';

    const handleSave = async (order: Order) => {
        console.log(order);
    };

    return (
        <VerticalContainer>
            <PanelHeader>Order Ticket</PanelHeader>
            <VerticalContainer px={2} py={1} className={ticketClass}>
                <h1 className={titleClass}>{title}</h1>
                <OrderForm order={order} onSave={handleSave} />
            </VerticalContainer>
        </VerticalContainer>
    );
};
