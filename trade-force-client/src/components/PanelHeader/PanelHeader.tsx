import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 100,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.panel,
        color: theme.palette.text.muted,
        fontFamily: 'Source Sans Pro',
        fontSize: 30,
        fontWeight: theme.typography.fontWeightLight,
    },
}));

export interface PanelHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const PanelHeader = ({ children, className }: PanelHeaderProps) => {
    const classes = useStyles();

    return <div className={`${className} ${classes.root}`}>{children}</div>;
};
