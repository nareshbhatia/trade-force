import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import { useRootStore } from '../../contexts';

export const SignOutButton = () => {
    const rootStore = useRootStore();
    const { authStore } = rootStore;

    return (
        <IconButton
            color="inherit"
            size="small"
            onClick={authStore.clearUser}
            aria-label="Sign Out"
        >
            <SignOutIcon />
        </IconButton>
    );
};
