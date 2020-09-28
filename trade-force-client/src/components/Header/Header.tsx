import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { HeaderTitle } from '@react-force/core';
import { User } from '@trade-force/models';
import { NewOrderSection } from './NewOrderSection';
import { UserSection } from './UserSection';

const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        color: theme.palette.text.secondary,
    },
}));

export interface HeaderProps {
    user?: User;
}

export const Header = ({ user }: HeaderProps) => {
    const classes = useStyles();

    return (
        <AppBar color="transparent" elevation={0} position="static">
            <Toolbar className={classes.toolbar}>
                <HeaderTitle>Trade Force</HeaderTitle>
                {user !== undefined ? <NewOrderSection /> : null}
                {user !== undefined ? <UserSection user={user} /> : null}
            </Toolbar>
        </AppBar>
    );
};
