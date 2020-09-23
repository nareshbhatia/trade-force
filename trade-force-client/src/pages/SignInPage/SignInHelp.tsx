import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { VerticalContainer } from '@react-force/core';
import { User, UserRoleLookup } from '@trade-force/models';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    table: {
        width: 460,
    },
}));

export interface SignInHelpProps {
    users: Array<User>;
}

export const SignInHelp = ({ users }: SignInHelpProps) => {
    const classes = useStyles();

    return (
        <VerticalContainer mx={4}>
            <Typography component="h1" variant="h5" className={classes.title}>
                Trade Force Users
            </Typography>
            <Table size="small" className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} hover>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.displayName}</TableCell>
                            <TableCell>{UserRoleLookup[user.role]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </VerticalContainer>
    );
};
