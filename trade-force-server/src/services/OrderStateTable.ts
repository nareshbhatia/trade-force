import { OrderAction, OrderStatus, UserRole } from '@trade-force/models';

type UserRoleExtended = UserRole | 'any';

interface OrderStateTransition {
    currentState: OrderStatus;
    role: UserRoleExtended;
    action: OrderAction;
    nextState: OrderStatus;
}

const orderStateTable: Array<OrderStateTransition> = [
    {
        currentState: 'pendingApproval',
        role: 'pa',
        action: 'approve',
        nextState: 'approved',
    },
    {
        currentState: 'pendingApproval',
        role: 'pa',
        action: 'reject',
        nextState: 'rejected',
    },
    {
        currentState: 'pendingApproval',
        role: 'any',
        action: 'cancel',
        nextState: 'canceled',
    },
    {
        currentState: 'approved',
        role: 'trader',
        action: 'place',
        nextState: 'placed',
    },
    {
        currentState: 'approved',
        role: 'any',
        action: 'cancel',
        nextState: 'canceled',
    },
    {
        currentState: 'placed',
        role: 'any',
        action: 'cancel',
        nextState: 'canceled',
    },
    {
        currentState: 'rejected',
        role: 'pm',
        action: 'resubmit',
        nextState: 'pendingApproval',
    },
    {
        currentState: 'rejected',
        role: 'any',
        action: 'cancel',
        nextState: 'canceled',
    },
];

export const getAllowedActions = (
    currentState: OrderStatus,
    role: UserRole
): Array<OrderAction> => {
    const actions: Array<OrderAction> = [];
    orderStateTable.forEach((transition) => {
        if (
            currentState === transition.currentState &&
            (role === transition.role || transition.role === 'any')
        ) {
            actions.push(transition.action);
        }
    });

    return actions;
};
