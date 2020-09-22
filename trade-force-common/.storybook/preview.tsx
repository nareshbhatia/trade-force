import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '@storybook/addon-console';
import { addDecorator } from '@storybook/react';
import {
    CssBaseline,
    MessageProvider,
    MessageRenderer,
} from '@react-force/core';
import { theme } from './theme';

const StoryDecorator = (Story: any) => (
    <ThemeProvider theme={theme}>
        <MessageProvider>
            <CssBaseline />
            <Story />
            <MessageRenderer />
        </MessageProvider>
    </ThemeProvider>
);

addDecorator(StoryDecorator);
