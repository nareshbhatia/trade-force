import {
    Order,
    OrderAction,
    OrderStatus,
    User,
    UserRole,
} from '@trade-force/models';

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
        action: 'update',
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
    order: Order,
    user: User
): Array<OrderAction> => {
    const actions: Array<OrderAction> = [];
    orderStateTable.forEach((transition) => {
        if (
            order.status === transition.currentState &&
            (user.role === transition.role || transition.role === 'any')
        ) {
            if (transition.action === 'update' && user.id !== order.managerId) {
                // don't allow other managers to update orders
            } else if (
                transition.action === 'cancel' &&
                user.id !== order.managerId
            ) {
                // don't allow other managers to cancel orders
            } else {
                actions.push(transition.action);
            }
        }
    });

    return actions;
};
