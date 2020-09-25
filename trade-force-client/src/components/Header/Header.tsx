import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { HeaderTitle } from '@react-force/core';
import { User } from '@trade-force/models';
import { SignOutButton } from './SignOutButton';

const useStyles = makeStyles((theme: Theme) => ({
    username: {
        marginRight: theme.spacing(1),
    },
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
                {user !== undefined ? (
                    <Typography className={classes.username}>
                        {user.displayName}
                    </Typography>
                ) : null}
                {user !== undefined ? <SignOutButton /> : null}
            </Toolbar>
        </AppBar>
    );
};
