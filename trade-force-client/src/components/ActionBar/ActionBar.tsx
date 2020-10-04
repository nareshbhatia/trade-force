import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    actionBar: {
        marginTop: theme.spacing(1) * 1.5,
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
        '& > :not(:first-child)': {
            marginLeft: theme.spacing(1),
        },
    },
}));

export const ActionBar: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.actionBar}>{children}</div>;
};
