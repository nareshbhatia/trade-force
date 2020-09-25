import React, { Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { User } from '@trade-force/models';
import { SignOutButton } from './SignOutButton';

const useStyles = makeStyles((theme: Theme) => ({
    username: {
        marginRight: theme.spacing(1),
    },
}));

export interface UserSectionProps {
    user?: User;
}

export const UserSection = ({ user }: UserSectionProps) => {
    const classes = useStyles();

    if (user === undefined) {
        return null;
    }

    return (
        <Fragment>
            <Typography className={classes.username}>
                {user.displayName}
            </Typography>
            <SignOutButton />
        </Fragment>
    );
};
