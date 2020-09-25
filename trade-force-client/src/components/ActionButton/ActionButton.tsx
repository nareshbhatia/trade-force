import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    buyAction: {
        backgroundColor: theme.palette.business.buyAction,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.buyAction, 0.2),
        },
    },
    sellAction: {
        backgroundColor: theme.palette.business.sellAction,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.sellAction, 0.2),
        },
    },
    buyActionForm: {
        backgroundColor: theme.palette.business.buyActionForm,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.buyActionForm, 0.2),
        },
    },
    sellActionForm: {
        backgroundColor: theme.palette.business.sellActionForm,
        '&:hover': {
            backgroundColor: darken(theme.palette.business.sellActionForm, 0.2),
        },
    },
    text: {
        color: theme.palette.text.primary,
    },
}));

export interface ActionButtonProps extends ButtonProps {
    customAction: 'buy' | 'sell' | 'buyInForm' | 'sellInForm';
}

export const ActionButton = ({
    children,
    customAction,
    className,
    ...rest
}: ActionButtonProps) => {
    const classes = useStyles();
    const colorMap = {
        buy: classes.buyAction,
        sell: classes.sellAction,
        buyInForm: classes.buyActionForm,
        sellInForm: classes.sellActionForm,
    };
    const buttonClass = classNames(
        className,
        colorMap[customAction],
        classes.text
    );

    return (
        <Button
            variant="contained"
            size="small"
            className={buttonClass}
            {...rest}
        >
            {children}
        </Button>
    );
};
