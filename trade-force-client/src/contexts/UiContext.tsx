import React, { useContext, useState } from 'react';
import { InitialUiState, UiState } from '../models';

// ---------- UiContext ----------
type UiStateSetter = (uiState: UiState) => void;

const UiContext = React.createContext<UiState | undefined>(undefined);
const UiSetterContext = React.createContext<UiStateSetter | undefined>(
    undefined
);

// ---------- Hooks ----------
function useUiState(): UiState {
    const uiState = useContext(UiContext);
    if (uiState === undefined) {
        /* istanbul ignore next */
        throw new Error('useUiState must be used within a UiContextProvider');
    }
    return uiState;
}

function useUiStateSetter(): UiStateSetter {
    const setUiState = useContext(UiSetterContext);
    if (setUiState === undefined) {
        /* istanbul ignore next */
        throw new Error(
            'useUiStateSetter must be used within a UiContextProvider'
        );
    }
    return setUiState;
}

// ---------- UiContextProvider ----------
const UiContextProvider: React.FC = ({ children }) => {
    const [uiState, setUiState] = useState<UiState>(InitialUiState);

    return (
        <UiContext.Provider value={uiState}>
            <UiSetterContext.Provider value={setUiState}>
                {children}
            </UiSetterContext.Provider>
        </UiContext.Provider>
    );
};

export { UiContextProvider, useUiState, useUiStateSetter };
