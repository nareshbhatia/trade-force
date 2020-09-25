import { createRouterState, RouterState, RouterStore } from 'mobx-state-router';
import { RootStore } from './RootStore';

const signin = createRouterState('signin');

const checkForUserSignedIn = async (
    fromState: RouterState,
    toState: RouterState,
    routerStore: RouterStore
) => {
    const { rootStore } = routerStore.options;
    const { authStore } = rootStore as RootStore;
    if (authStore.user === undefined) {
        return signin;
    }
};

// Routes are matched from top to bottom. Make sure they are sequenced
// in the order of priority. It is generally best to sort them by pattern,
// prioritizing specific patterns over generic patterns (patterns with
// one or more parameters). For example:
//     /items
//     /items/:id
export const routes = [
    {
        name: 'home',
        pattern: '/',
        beforeEnter: checkForUserSignedIn,
    },
    { name: 'notFound', pattern: '/not-found' },
    { name: 'signin', pattern: '/signin' },
];
