import { Fund, Order, OrderStatus } from '@trade-force/models';
import Chance from 'chance';
import funds from './funds.json';
import securities from './securities.json';
import users from './users.json';

const { managers, analysts, traders } = users;
const managerCount = managers.length;

const PENDING_APPROVAL_COUNT = 10 * managerCount;
const APPROVED_COUNT = 10 * managerCount;
const REJECTED_COUNT = 2 * managerCount;
const PLACED_COUNT = 20 * managerCount;
const EXECUTED_COUNT = 100 * managerCount;
const CANCELED_COUNT = 10 * managerCount;

const fundIds = funds.map((fund) => fund.id);
const secIds = securities.map((security) => security.id);
const analystIds = analysts.map((analyst) => analyst.id);
const traderIds = traders.map((trader) => trader.id);

const orders: Array<Order> = [];
const chance = new Chance();

const newOrder = (status: OrderStatus): Order => {
    const fundId = chance.pickone(fundIds);
    const fund = funds.find((fund) => fund.id === fundId) as Fund;
    const managerId = fund.manager;
    return {
        id: chance.guid(),
        side: chance.pickone(['buy', 'sell']),
        secId: chance.pickone(secIds),
        quantity: chance.integer({ min: 1, max: 100 }) * 100,
        executed: 0,
        type: 'market',
        status,
        fundId,
        managerId,
        note: '',
    };
};

const generatePendingApprovalOrders = () => {
    for (let i = 0; i < PENDING_APPROVAL_COUNT; i++) {
        const order = newOrder('pendingApproval');
        orders.push(order);
    }
};

const generateApprovedOrders = () => {
    for (let i = 0; i < APPROVED_COUNT; i++) {
        const order = newOrder('approved');
        order.analystId = chance.pickone(analystIds);
        orders.push(order);
    }
};

const generateRejectedOrders = () => {
    for (let i = 0; i < REJECTED_COUNT; i++) {
        const order = newOrder('rejected');
        order.analystId = chance.pickone(analystIds);
        orders.push(order);
    }
};

const generatePlacedOrders = () => {
    for (let i = 0; i < PLACED_COUNT; i++) {
        const order = newOrder('placed');
        const { quantity } = order;
        order.executed = chance.integer({ min: 0, max: quantity/100 }) * 100;
        order.analystId = chance.pickone(analystIds);
        order.traderId = chance.pickone(traderIds);
        orders.push(order);
    }
};

const generateExecutedOrders = () => {
    for (let i = 0; i < EXECUTED_COUNT; i++) {
        const order = newOrder('executed');
        order.executed = order.quantity;
        order.analystId = chance.pickone(analystIds);
        order.traderId = chance.pickone(traderIds);
        orders.push(order);
    }
};

const generateCanceledOrders = () => {
    for (let i = 0; i < CANCELED_COUNT; i++) {
        const order = newOrder('canceled');
        order.analystId = chance.pickone(analystIds);
        orders.push(order);
    }
};

const generateOrders = () => {
    generatePendingApprovalOrders();
    generateApprovedOrders();
    generateRejectedOrders();
    generatePlacedOrders();
    generateExecutedOrders();
    generateCanceledOrders();
};

generateOrders();
console.log(JSON.stringify(orders, null, 2));
