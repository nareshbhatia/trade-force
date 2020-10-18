import React from 'react';
import { MessageProvider } from '@react-force/core';
import { render } from '@testing-library/react';
import { useUsers } from '../../hooks';
import { SignInPage } from './SignInPage';

jest.mock('../../contexts/RootStoreContext', () => ({
    useRootStore: () => ({
        authStore: jest.fn(),
        routerStore: jest.fn(),
    }),
}));

jest.mock('../../hooks/useUsers', () => ({
    useUsers: jest.fn(),
}));

const mockedUseUsers = useUsers as jest.Mock;

// ----- Test -----
describe('SignInPage', () => {
    it('shows a list of users', async () => {
        mockedUseUsers.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [
                {
                    id: 'elvis.presley',
                    displayName: 'Elvis Presley',
                    initials: 'EP',
                    role: 'pm',
                },
                {
                    id: 'paul.mccartney',
                    displayName: 'Paul McCartney',
                    initials: 'PM',
                    role: 'pa',
                },
                {
                    id: 'tom.cruise',
                    displayName: 'Tom Cruise',
                    initials: 'TC',
                    role: 'trader',
                },
            ],
        });
        const { findAllByTestId } = render(
            <MessageProvider>
                <SignInPage />
            </MessageProvider>
        );
        const userRows = await findAllByTestId('user-row');
        expect(userRows.length).toBe(3);
    });
});
