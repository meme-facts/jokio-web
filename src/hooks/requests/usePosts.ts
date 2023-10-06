import { useQuery, UseQueryResult } from 'react-query';
import { getAllPosts } from '../../requests/posts';

export const useCampaigns = (): UseQueryResult<unknown> => {
    const params = { page: 1, limit: 10 }
    return useQuery(['posts', params], () => getAllPosts(params), {
        staleTime: 1000 * 60,
    });
};