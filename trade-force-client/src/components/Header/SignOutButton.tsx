import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import { useRootStore, useUiStateSetter } from '../../contexts';
import { InitialUiState } from '../../models';

export const SignOutButton = () => {
    const rootStore = useRootStore();
    const { authStore } = rootStore;
    const setUiState = useUiStateSetter();

    const handleClick = () => {
        authStore.clearUser();

        // clear ui state so that order ticket does not show up after next login
        setUiState(InitialUiState);
    };

    return (
        <IconButton
            color="inherit"
            size="small"
            onClick={handleClick}
            aria-label="Sign Out"
        >
            <SignOutIcon />
        </IconButton>
    );
};
