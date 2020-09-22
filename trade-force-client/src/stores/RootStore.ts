import { createRouterState, RouterStore } from 'mobx-state-router';
import { AuthStore } from './AuthStore';
import { routes } from './routes';

const notFound = createRouterState('notFound');

export class RootStore {
    authStore = new AuthStore(this);

    // Pass rootStore as an option to RouterStore
    routerStore = new RouterStore(routes, notFound, {
        rootStore: this,
    });
}
