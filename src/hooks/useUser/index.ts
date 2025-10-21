import { useState, useEffect, useCallback } from 'react';
import userService from '@services/user';
import { IMePaginationResponse, IMeResponse, IUserRankResponse } from '@models/user/response';

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

// Global user data hook with refresh capabilities
export function useGlobalUserData(initialUser?: IMeResponse["data"] | null) {
    const [userData, setUserData] = useState<IMeResponse["data"] | null>(initialUser || null);
    const [isLoading, setIsLoading] = useState(false);

    const refreshUserData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await userService.getMe() as IMeResponse;
            if (response?.statusCode === 200 && response?.data) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateUserData = useCallback((newData: IMeResponse["data"] | null) => {
        setUserData(newData);
    }, []);

    // Initialize with provided data if available
    useEffect(() => {
        if (initialUser && !userData) {
            setUserData(initialUser);
        }
    }, [initialUser, userData]);

    return {
        userData,
        isLoading,
        refreshUserData,
        updateUserData,
    };
}

export interface UserRankParams {
    currentPage?: number;
    pageSize?: number;
}

export function useUserRank(params?: UserRankParams, initialData?: IUserRankResponse) {
    const [data, setData] = useState<IUserRankResponse | undefined>(initialData || undefined);
    const [isLoading, setIsLoading] = useState<boolean>(initialData ? false : true);
    const [error, setError] = useState<Error | null>(null);

    // Extract values để tránh dependency loop - với fallback values
    const currentPage = params?.currentPage ?? 1;
    const pageSize = params?.pageSize ?? 15;

    const fetchUserRank = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getUserRank({ currentPage, pageSize }) as IUserRankResponse;
            setData(response);
        } catch (err) {
            console.error('Error fetching user rank:', err);
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        if (!initialData) {
            fetchUserRank();
        }
    }, [fetchUserRank, initialData]);

    const refetch = useCallback(() => {
        fetchUserRank();
    }, [fetchUserRank]);

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}
