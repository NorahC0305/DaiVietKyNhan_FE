import { QueryClient } from '@tanstack/react-query';

// Default query options for the entire application
const defaultQueryOptions = {
  queries: {
    // Time in milliseconds that data remains fresh
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Time in milliseconds that unused/inactive cache data remains in memory
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    // Retry failed requests
    retry: (failureCount: number, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    // Retry delay with exponential backoff
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch on window focus
    refetchOnWindowFocus: false,
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Refetch on mount
    refetchOnMount: true,
  },
  mutations: {
    // Retry failed mutations
    retry: (failureCount: number, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    // Retry delay for mutations
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
  },
};

// Create the query client instance
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

// Query client configuration for different environments
export const getQueryClientConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    ...defaultQueryOptions,
    queries: {
      ...defaultQueryOptions.queries,
      // In development, reduce stale time for faster updates
      staleTime: isDevelopment ? 1 * 60 * 1000 : defaultQueryOptions.queries.staleTime,
      // Enable devtools in development
      ...(isDevelopment && {
        refetchOnWindowFocus: true,
      }),
    },
  };
};

// Utility function to create a new query client with custom options
export const createQueryClient = (customOptions?: Partial<typeof defaultQueryOptions>) => {
  return new QueryClient({
    defaultOptions: {
      ...defaultQueryOptions,
      ...customOptions,
    },
  });
};
