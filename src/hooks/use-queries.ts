import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  UseQueryOptions, 
  UseMutationOptions,
  QueryKey,
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query';
import { queryKeys } from '@lib/QueryKey';
import { toast } from 'react-toastify';

// Generic types for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Generic query hook with error handling
export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

// Generic mutation hook with error handling and success notifications
export function useApiMutation<TData = unknown, TVariables = unknown, TError = ApiError>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
    successMessage?: string;
    errorMessage?: string;
    invalidateQueries?: QueryKey[];
  } & Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      options?.onSuccess?.(data, variables);
    },
    onError: (error: TError, variables: TVariables) => {
      console.error('Mutation error:', error);
      const errorMessage = options?.errorMessage || (error as ApiError)?.message || 'An error occurred';
      toast.error(errorMessage);
      options?.onError?.(error, variables);
    },
    ...options,
  });
}

// Infinite query hook for pagination
export function useInfiniteApiQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<PaginatedResponse<TData>>,
  options?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse<TData>,
      TError,
      PaginatedResponse<TData>,
      QueryKey,
      number
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >
) {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
    },
    ...options,
  });
}

// Optimistic update helper
export function useOptimisticMutation<TData = unknown, TVariables = unknown, TError = ApiError>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    queryKey: QueryKey;
    optimisticUpdate: (oldData: TData | undefined, variables: TVariables) => TData;
    rollbackUpdate: (oldData: TData | undefined, variables: TVariables) => TData;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: options.queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(options.queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<TData>(options.queryKey, (old) => 
        options.optimisticUpdate(old, variables)
      );

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (error: TError, variables: TVariables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData<TData>(options.queryKey, (old) => 
          options.rollbackUpdate(old, variables)
        );
      }
      
      console.error('Optimistic mutation error:', error);
      const errorMessage = options.errorMessage || (error as ApiError)?.message || 'An error occurred';
      toast.error(errorMessage);
      options?.onError?.(error, variables);
    },
    onSuccess: (data, variables) => {
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      options?.onSuccess?.(data, variables);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: options.queryKey });
    },
  });
}

// Utility hook for prefetching
export function usePrefetchQuery() {
  const queryClient = useQueryClient();

  return {
    prefetch: <TData = unknown>(
      queryKey: QueryKey,
      queryFn: () => Promise<TData>,
      options?: { staleTime?: number }
    ) => {
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: options?.staleTime || 5 * 60 * 1000, // 5 minutes default
      });
    },
    prefetchInfinite: <TData = unknown>(
      queryKey: QueryKey,
      queryFn: ({ pageParam }: { pageParam?: number }) => Promise<PaginatedResponse<TData>>
    ) => {
      queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<TData>) => {
          const { pagination } = lastPage;
          return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
        },
      });
    },
  };
}
