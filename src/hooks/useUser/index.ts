import { useApiQuery } from '../use-queries';
import { queryKeys } from '@lib/QueryKey';
import userService from '@services/user';
import { IMePaginationResponse } from '@models/user/response';

export interface UserListParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: string;
}

export function useUsersList(params?: UserListParams, initialData?: IMePaginationResponse) {
    // Check if user has applied any filters (search, sort, pagination, etc.)
    const hasUserInteraction = params && (
        params.search?.trim() ||
        (params.sortBy && params.sortBy !== 'createdAt') ||
        (params.sortOrder && params.sortOrder !== 'desc') ||
        params.status ||
        (params.page && params.page > 1) ||
        (params.limit && params.limit !== 15)
    );

    // Check if we should use initial data (no user interaction)
    const shouldUseInitialData = !hasUserInteraction && initialData;

    return useApiQuery<IMePaginationResponse>(
        queryKeys.users.list(params),
        async () => {
            return await userService.getUsers(params) as IMePaginationResponse;
        },
        {
            refetchOnWindowFocus: false,
            staleTime: 2 * 60 * 1000, // 2 minutes
            // Use placeholderData to show initial data immediately without loading state
            placeholderData: shouldUseInitialData ? initialData : undefined,
            // Use initialData for caching benefits
            initialData: shouldUseInitialData ? initialData : undefined,
        }
    );
}

export function useMe() {
    return useApiQuery(
        queryKeys.auth.user(),
        async () => {
            return await userService.getMe();
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );
}
