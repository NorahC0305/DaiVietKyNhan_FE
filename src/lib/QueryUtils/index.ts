import { QueryClient, QueryKey } from '@tanstack/react-query';
import { queryKeys } from '../QueryKey';

// Utility functions for query management
export class QueryUtils {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  // Invalidate all queries for a specific entity
  invalidateEntity(entityName: string) {
    this.queryClient.invalidateQueries({
      queryKey: queryKeys.entities.all(entityName),
    });
  }

  // Invalidate all auth-related queries
  invalidateAuth() {
    this.queryClient.invalidateQueries({
      queryKey: queryKeys.auth.all,
    });
  }

  // Invalidate all user-related queries
  invalidateUsers() {
    this.queryClient.invalidateQueries({
      queryKey: queryKeys.users.all,
    });
  }

  // Invalidate queries matching a pattern
  invalidateByPattern(pattern: QueryKey) {
    this.queryClient.invalidateQueries({
      predicate: (query) => {
        return this.matchesPattern(query.queryKey, pattern);
      },
    });
  }

  // Remove queries from cache
  removeQueries(queryKey: QueryKey) {
    this.queryClient.removeQueries({ queryKey });
  }

  // Set query data
  setQueryData<T>(queryKey: QueryKey, data: T) {
    this.queryClient.setQueryData(queryKey, data);
  }

  // Get query data
  getQueryData<T>(queryKey: QueryKey): T | undefined {
    return this.queryClient.getQueryData<T>(queryKey);
  }

  // Prefetch query
  async prefetchQuery<T>(
    queryKey: QueryKey,
    queryFn: () => Promise<T>,
    options?: { staleTime?: number }
  ) {
    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: options?.staleTime || 5 * 60 * 1000,
    });
  }

  // Check if query exists in cache
  hasQuery(queryKey: QueryKey): boolean {
    return this.queryClient.getQueryState(queryKey) !== undefined;
  }

  // Get query state
  getQueryState(queryKey: QueryKey) {
    return this.queryClient.getQueryState(queryKey);
  }

  // Clear all queries
  clearAll() {
    this.queryClient.clear();
  }

  // Cancel all queries
  cancelAll() {
    this.queryClient.cancelQueries();
  }

  // Private helper to check if query key matches pattern
  private matchesPattern(queryKey: QueryKey, pattern: QueryKey): boolean {
    if (queryKey.length !== pattern.length) return false;

    return pattern.every((segment, index) => {
      if (typeof segment === 'string') {
        return queryKey[index] === segment;
      }
      return true;
    });
  }
}

// Create a singleton instance
let queryUtilsInstance: QueryUtils | null = null;

export const getQueryUtils = (queryClient: QueryClient): QueryUtils => {
  if (!queryUtilsInstance) {
    queryUtilsInstance = new QueryUtils(queryClient);
  }
  return queryUtilsInstance;
};

// Hook to use query utils
export const useQueryUtils = () => {
  const queryClient = useQueryClient();
  return getQueryUtils(queryClient);
};

// Import useQueryClient from react-query
import { useQueryClient } from '@tanstack/react-query';
