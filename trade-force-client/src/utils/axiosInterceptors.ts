import { WindowEnv } from '@react-force/models';
import axios from 'axios';
import { EnvVar } from './constants';

const env = new WindowEnv();
const baseURL = env.get(EnvVar.API_URL);

const USER_ID_HEADER = 'Trade-Force-User';

// ----- Trade Force User Id -----
let tfUserId: string | undefined;

export const UserIdHelper = {
    setUserId: (userId: string) => {
        tfUserId = userId;
    },

    clearUserId: () => {
        tfUserId = undefined;
    },
};

// ----- Axios interceptor to configure all requests -----
axios.interceptors.request.use(async (config) => {
    // configure baseURL
    config.baseURL = baseURL;

    // add userId header
    if (tfUserId !== undefined) {
        config.headers[USER_ID_HEADER] = tfUserId;
    }

    return config;
});
