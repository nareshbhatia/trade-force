import { OrderEntityModel } from '@trade-force/models';

export interface UiState {
    isOrderTicketOpen: boolean;
    targetOrder?: OrderEntityModel;
}

export const InitialUiState: UiState = {
    isOrderTicketOpen: false,
};
