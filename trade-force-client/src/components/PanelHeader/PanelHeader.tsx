import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: 68,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.bg3,
        color: theme.palette.text.text3,
        fontSize: 20,
        fontWeight: theme.typography.fontWeightLight,
    },
}));

export const PanelHeader: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.root}>{children}</div>;
};
