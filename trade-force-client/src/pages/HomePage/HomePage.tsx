import React, { Fragment, useState } from 'react';
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

    const [isOrderTicketOpen, setOrderTicketOpen] = useState(true);

    const handleOrderTicketClose = () => {
        setOrderTicketOpen(false);
    };

    return (
        <ViewVerticalContainer>
            <Header user={user} />
            <HorizontalContainer>
                <VerticalContainer flex={1}>
                    <Orders />
                </VerticalContainer>
                {isOrderTicketOpen ? (
                    <Fragment>
                        <Divider orientation="vertical" flexItem />
                        <VerticalContainer flex="0 0 256px">
                            <OrderTicket onClose={handleOrderTicketClose} />
                        </VerticalContainer>
                    </Fragment>
                ) : null}
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};
