import { CollectionModel, Order } from '../src';
import { order1EntityModel } from './orderEntityModel';

export const order1CollectionModel: CollectionModel<Order> = {
    collection: [order1EntityModel],
    _links: {
        self: { href: '/orders' },
    },
};
