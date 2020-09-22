import React, { Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {
    ErrorBoundary,
    Loading,
    MessageProvider,
    MessageRenderer,
} from '@react-force/core';
import { observer } from 'mobx-react';
import { RouterContext, RouterView } from 'mobx-state-router';
// import { ReactQueryDevtools } from 'react-query-devtools';
import { theme } from './components';
import { RootStoreContext } from './contexts';
import { initApp } from './init';
import { viewMap } from './viewMap';

// Initialize the app
const rootStore = initApp();
const { routerStore } = rootStore;

// Observer theme changes
export const App = observer(() => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <ThemeProvider theme={theme}>
                    <MessageProvider>
                        <RootStoreContext.Provider value={rootStore}>
                            <RouterContext.Provider value={routerStore}>
                                <CssBaseline />
                                <RouterView viewMap={viewMap} />
                                <MessageRenderer />
                                {/* <ReactQueryDevtools initialIsOpen /> */}
                            </RouterContext.Provider>
                        </RootStoreContext.Provider>
                    </MessageProvider>
                </ThemeProvider>
            </Suspense>
        </ErrorBoundary>
    );
});
