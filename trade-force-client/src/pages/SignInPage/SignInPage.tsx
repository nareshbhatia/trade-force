import React, { MouseEvent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {
    useMessageSetter,
    VerticalContainer,
    ViewVerticalContainer,
} from '@react-force/core';
import { MessageFactory } from '@react-force/models';
import { UserRoleLookup } from '@trade-force/models';
import { Header } from '../../components';
import { useRootStore } from '../../contexts';
import { useUsers } from '../../hooks';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    table: {
        width: 460,
    },
    row: {
        cursor: 'pointer',
    },
}));

export const SignInPage = () => {
    const classes = useStyles();
    const rootStore = useRootStore();
    const { isLoading, isError, data: users, error } = useUsers();
    const { authStore } = rootStore;
    const setMessage = useMessageSetter();

    const handleClick = (e: MouseEvent) => {
        const selectedId = e.currentTarget.getAttribute('data-userid');
        const user = users?.find((user) => user.id === selectedId);

        if (user === undefined) {
            setMessage(MessageFactory.error('Invalid ID'));
            return;
        }

        // Save user
        authStore.setUser(user);
    };

    // Allow ErrorBoundary to handle errors
    if (isError) {
        throw error;
    }

    if (isLoading || users === undefined) {
        return null;
    }

    return (
        <ViewVerticalContainer>
            <Header />
            <VerticalContainer mx={4}>
                <Typography
                    component="h1"
                    variant="h5"
                    className={classes.title}
                >
                    Select a user
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
                            <TableRow
                                key={user.id}
                                data-userid={user.id}
                                data-testid="user-row"
                                className={classes.row}
                                hover
                                onClick={handleClick}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>
                                    {UserRoleLookup[user.role]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
