import React, { Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { NumberUtils } from '@react-force/number-utils';
import { StringUtils } from '@react-force/utils';
import {
    EntityModel,
    Order,
    OrderStatusLookup,
    OrderTypeLookup,
} from '@trade-force/models';
import classNames from 'classnames';
import { useSecurities, useUsers } from '../../hooks';
import { ActionBar } from '../ActionBar';
import { ActionButton } from '../ActionButton';
import { ProgressBar } from '../ProgressBar';
import { Subtitle, SectionTitle } from '../Text';

const useStyles = makeStyles((theme: Theme) => ({
    subtitle: {
        marginBottom: theme.spacing(2),
    },
    secId: {
        fontWeight: theme.typography.fontWeightBold,
    },
    secName: {
        marginLeft: theme.spacing(1),
    },
    target: {
        marginLeft: theme.spacing(2),
    },
    section: {
        marginTop: theme.spacing(2),
        marginBottom: 3,
    },
    buyText: {
        color: theme.palette.business.buyText,
    },
    sellText: {
        color: theme.palette.business.sellText,
    },
    status: {
        color: theme.palette.secondary.main,
    },
    progress: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.secondary.main,
    },
    progressBar: {
        height: 20,
        marginTop: 4,
        marginBottom: 4,
    },
    done: {
        color: theme.palette.secondary.dark,
        fontSize: 10,
    },
}));

export interface OrderViewProps {
    orderModel: EntityModel<Order>;
}

export const OrderView = ({ orderModel }: OrderViewProps) => {
    const classes = useStyles();

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

    const order = orderModel.entity;

    const {
        analystId,
        executed,
        fundId,
        limitPrice,
        managerId,
        note,
        quantity,
        secId,
        side,
        status,
        traderId,
        type,
    } = order;

    const customAction = order.side === 'buy' ? 'buyInForm' : 'sellInForm';

    const pctDone = (executed / quantity) * 100;
    const pctDoneStr = `${NumberUtils.format(pctDone, '0')}%`;
    const qtyStr = NumberUtils.format(quantity, '0,0');

    const sectionClass = classNames(
        classes.section,
        side === 'buy' ? classes.buyText : classes.sellText
    );

    const security = securities.find((security) => security.id === secId);
    if (security === undefined) {
        throw new Error('Security not found');
    }

    const manager = users.find((user) => user.id === managerId);
    if (manager === undefined) {
        throw new Error('Manager not found');
    }

    const analyst =
        analystId !== undefined
            ? users.find((user) => user.id === analystId)
            : undefined;

    const trader =
        traderId !== undefined
            ? users.find((user) => user.id === traderId)
            : undefined;

    return (
        <VerticalContainer>
            <Subtitle className={classes.subtitle}>
                <span className={classes.secId}>{secId}</span>
                <span className={classes.secName}>{security.name}</span>
            </Subtitle>

            <div>
                Type: {OrderTypeLookup[type]}
                {limitPrice !== undefined ? (
                    <span className={classes.target}>
                        Target: {NumberUtils.formatAsMoney(limitPrice)}
                    </span>
                ) : null}
            </div>

            <SectionTitle className={sectionClass}>Order Progress</SectionTitle>
            <div className={classes.status}>{OrderStatusLookup[status]}</div>
            <ProgressBar className={classes.progressBar} pctDone={pctDone} />
            <div className={classes.progress}>
                <span>{pctDoneStr}</span>
                <span>{qtyStr}</span>
            </div>
            <div className={classes.done}>Done</div>

            <SectionTitle className={sectionClass}>Roles</SectionTitle>
            <div>
                Manager: {manager.displayName} ({fundId})
            </div>
            <div>
                Analyst: {analyst !== undefined ? analyst.displayName : '-'}
            </div>
            <div>Trader: {trader !== undefined ? trader.displayName : '-'}</div>

            {StringUtils.isBlank(note) ? null : (
                <Fragment>
                    <SectionTitle className={sectionClass}>Note</SectionTitle>
                    <div>{note}</div>
                </Fragment>
            )}

            <ActionBar>
                {EntityModel.hasLink(orderModel, 'approveOrder') ? (
                    <ActionButton customAction={customAction}>
                        Approve
                    </ActionButton>
                ) : null}
                {EntityModel.hasLink(orderModel, 'rejectOrder') ? (
                    <ActionButton customAction={customAction}>
                        Reject
                    </ActionButton>
                ) : null}
                {EntityModel.hasLink(orderModel, 'placeOrder') ? (
                    <ActionButton customAction={customAction}>
                        Place
                    </ActionButton>
                ) : null}
                {EntityModel.hasLink(orderModel, 'cancelOrder') ? (
                    <ActionButton customAction={customAction}>
                        Cancel
                    </ActionButton>
                ) : null}
            </ActionBar>
        </VerticalContainer>
    );
};
