import React from 'react';
import Divider from '@material-ui/core/Divider';
import {
    HorizontalContainer,
    VerticalContainer,
    ViewVerticalContainer,
} from '@react-force/core';
import { Header, Orders, OrderTicket } from '../../components';
import { useRootStore } from '../../contexts';

export const HomePage = () => {
    const rootStore = useRootStore();
    const { authStore } = rootStore;
    const user = authStore.user;

    return (
        <ViewVerticalContainer>
            <Header user={user} />
            <HorizontalContainer>
                <VerticalContainer flex={1}>
                    <Orders />
                </VerticalContainer>
                <Divider orientation="vertical" flexItem />
                <VerticalContainer flex="0 0 170px">
                    <OrderTicket />
                </VerticalContainer>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};
