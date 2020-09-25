import { Order } from '@trade-force/models';

export interface UiState {
    isOrderTicketOpen: boolean;
    targetOrder?: Order;
}

export const InitialUiState: UiState = {
    isOrderTicketOpen: false,
};
