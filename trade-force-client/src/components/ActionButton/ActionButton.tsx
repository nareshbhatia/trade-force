import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    buy: {
        backgroundColor: theme.palette.business.buyActionAlt,
    },
    sell: {
        backgroundColor: theme.palette.business.sellActionAlt,
    },
    text: {
        color: theme.palette.text.primary,
    },
}));

export interface ActionButtonProps {
    children: React.ReactNode;
    color: 'buy' | 'sell';
}

export const ActionButton = ({ children, color }: ActionButtonProps) => {
    const classes = useStyles();
    const colorMap = {
        buy: classes.buy,
        sell: classes.sell,
    };
    const buttonClass = classNames(colorMap[color], classes.text);

    return (
        <Button variant="contained" size="small" className={buttonClass}>
            {children}
        </Button>
    );
};
