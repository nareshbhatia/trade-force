export const order1CollectionModelWireFormat = {
    _embedded: {
        orders: [
            {
                id: 'f95244e6-1a1a-51ea-8c9a-0bca651329c6',
                side: 'buy',
                secId: 'GRMN',
                quantity: 9600,
                executed: 0,
                type: 'market',
                status: 'pendingApproval',
                fundId: 'TFTBM',
                managerId: 'aretha.franklin',
                note: '',
                _links: {
                    self: {
                        href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
                    },
                    approveOrder: {
                        href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
                    },
                    rejectOrder: {
                        href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
                    },
                    cancelOrder: {
                        href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
                    },
                },
            },
        ],
    },
    _links: {
        self: { href: '/orders' },
    },
};
