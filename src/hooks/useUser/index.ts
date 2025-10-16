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
    const query = useApiQuery<IMePaginationResponse>(
        queryKeys.users.list(params),

        () => userService.getUsers(params) as Promise<IMePaginationResponse>,
        {
            initialData: initialData,
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
        }
    );
    return query;
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
