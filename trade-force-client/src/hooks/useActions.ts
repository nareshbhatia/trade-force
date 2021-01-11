import { EntityModel } from '@http-utils/hateoas';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiPath } from '../utils';

/**
 * Fetches allowed actions from the server
 */
const fetchActions = async (): Promise<EntityModel<Object>> => {
    const resp = await axios.get(ApiPath.actions);
    return EntityModel.deserialize<Object>(resp.data);
};

/**
 * Hook to fetch allowed actions from server
 */
export const useActions = () => {
    return useQuery<EntityModel<Object>, 'actions'>('actions', fetchActions);
};
