import { WindowEnv } from '@react-force/models';
import axios from 'axios';
import { EnvVar } from './constants';

const USER_ID_HEADER = 'Trade-Force-User';

let tfUserId: string | undefined;

export const TfApiHelpers = {
    setUserId: (userId: string) => {
        tfUserId = userId;
    },

    clearUserId: () => {
        tfUserId = undefined;
    },
};
// initialize tfApi
const env = new WindowEnv();
export const tfApi = axios.create({
    baseURL: env.get(EnvVar.API_URL),
});

// interceptor to inject headers
tfApi.interceptors.request.use(async (config) => {
    // add userId header
    if (tfUserId !== undefined) {
        config.headers[USER_ID_HEADER] = tfUserId;
    }

    return config;
});
