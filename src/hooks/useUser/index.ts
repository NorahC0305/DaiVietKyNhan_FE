import { useState, useEffect, useCallback } from 'react';
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
    const [data, setData] = useState<IMePaginationResponse | undefined>(initialData);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState<Error | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getUsers(params) as IMePaginationResponse;
            setData(response);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        if (!initialData) {
            fetchUsers();
        }
    }, [fetchUsers, initialData]);

    const refetch = useCallback(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}

export function useMe() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchMe = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getMe();
            setData(response);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const refetch = useCallback(() => {
        fetchMe();
    }, [fetchMe]);

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}
