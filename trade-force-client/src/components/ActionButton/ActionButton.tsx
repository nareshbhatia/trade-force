import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    buy: {
        backgroundColor: theme.palette.business.buyActionForm,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.buyActionForm, 0.2),
        },
    },
    sell: {
        backgroundColor: theme.palette.business.sellActionForm,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.sellActionForm, 0.2),
        },
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
