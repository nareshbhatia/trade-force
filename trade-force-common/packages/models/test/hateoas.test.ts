import { order1 } from '../mock-data/order';
import { order1CollectionModel } from '../mock-data/orderCollectionModel';
import { order1CollectionModelWireFormat } from '../mock-data/orderCollectionModelWireFormat';
import { order1EntityModel } from '../mock-data/orderEntityModel';
import { order1EntityModelWireFormat } from '../mock-data/orderEntityModel-wire-format';
import { CollectionModel, EntityModel, Order } from '../src';

describe('hateoas', () => {
    it('EntityModel can be created from an entity', () => {
        const result = EntityModel.create<Order>(order1);
        EntityModel.addLink(
            result,
            'self',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        EntityModel.addLink(
            result,
            'approveOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        EntityModel.addLink(
            result,
            'rejectOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        EntityModel.addLink(
            result,
            'cancelOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(result).toEqual(order1EntityModel);
    });

    it('Links can be managed using addLinks(), getLink() and hasLink()', () => {
        const result = EntityModel.create<Order>(order1);
        EntityModel.addLinks(result, {
            self: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
            approveOrder: {
                href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
            },
            rejectOrder: {
                href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
            },
            cancelOrder: {
                href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
            },
        });
        expect(result).toEqual(order1EntityModel);
        expect(EntityModel.getLink(result, 'approveOrder')?.href).toBe(
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(EntityModel.hasLink(result, 'approveOrder')).toBe(true);
    });

    it('EntityModel can be serialized', () => {
        const result = EntityModel.serialize<Order>(order1EntityModel);
        expect(result).toEqual(order1EntityModelWireFormat);
    });

    it('EntityModel can be deserialized', () => {
        const result = EntityModel.deserialize<Order>(
            order1EntityModelWireFormat
        );
        expect(result).toEqual(order1EntityModel);
    });

    it('CollectionModel can be created from an entities', () => {
        const result = CollectionModel.create<Order>();

        // Add a link
        CollectionModel.addLink(result, 'self', '/orders');

        // Add an EntityModel
        CollectionModel.addEntityModel<Order>(result, order1EntityModel);

        expect(result).toEqual(order1CollectionModel);
    });

    it('CollectionModel can be serialized', () => {
        const result = CollectionModel.serialize<Order>(
            order1CollectionModel,
            'orders'
        );
        expect(result).toEqual(order1CollectionModelWireFormat);
    });

    it('CollectionModel can be deserialized', () => {
        const result = CollectionModel.deserialize<Order>(
            order1CollectionModelWireFormat,
            'orders'
        );
        expect(result).toEqual(order1CollectionModel);
    });
});
