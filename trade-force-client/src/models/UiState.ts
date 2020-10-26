import { EntityModel, Order } from '@trade-force/models';

export interface UiState {
    isOrderTicketOpen: boolean;
    targetOrder?: EntityModel<Order>;
}

export const InitialUiState: UiState = {
    isOrderTicketOpen: false,
};
