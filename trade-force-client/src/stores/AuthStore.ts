import { User } from '@trade-force/models';
import { action, decorate, observable } from 'mobx';
import { createRouterState } from 'mobx-state-router';
import { RootStore } from './RootStore';

const home = createRouterState('home');
const signin = createRouterState('signin');

export class AuthStore {
    rootStore: RootStore;
    user?: User;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    setUser = (user: User) => {
        this.user = user;
        this.rootStore.routerStore.goToState(home);
    };

    clearUser = () => {
        this.user = undefined;
        this.rootStore.routerStore.goToState(signin);
    };

    signOut() {
        this.clearUser();
    }
}

decorate(AuthStore, {
    user: observable.ref,
    setUser: action,
    clearUser: action,
});
