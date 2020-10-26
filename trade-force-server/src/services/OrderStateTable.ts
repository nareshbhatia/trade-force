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
        action: 'approveOrder',
        nextState: 'approved',
    },
    {
        currentState: 'pendingApproval',
        role: 'pa',
        action: 'rejectOrder',
        nextState: 'rejected',
    },
    {
        currentState: 'pendingApproval',
        role: 'any',
        action: 'cancelOrder',
        nextState: 'canceled',
    },
    {
        currentState: 'approved',
        role: 'trader',
        action: 'placeOrder',
        nextState: 'placed',
    },
    {
        currentState: 'approved',
        role: 'any',
        action: 'cancelOrder',
        nextState: 'canceled',
    },
    {
        currentState: 'placed',
        role: 'any',
        action: 'cancelOrder',
        nextState: 'canceled',
    },
    {
        currentState: 'rejected',
        role: 'pm',
        action: 'updateOrder',
        nextState: 'pendingApproval',
    },
    {
        currentState: 'rejected',
        role: 'any',
        action: 'cancelOrder',
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
            if (transition.action === 'updateOrder' && user.id !== order.managerId) {
                // don't allow other managers to update orders
            } else if (
                transition.action === 'cancelOrder' &&
                user.role === 'pm' &&
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
