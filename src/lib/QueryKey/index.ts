/**
 * Query Key Factory for TanStack Query
 * Provides type-safe query keys and easy invalidation
 */

// Base query keys
export const queryKeys = {
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },

  // User related queries
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (params?: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
      status?: string;
    }) => [...queryKeys.users.lists(), { ...params }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.users.details(), id] as const,
  },

  // Generic patterns for common use cases
  entities: {
    all: (entity: string) => [entity] as const,
    lists: (entity: string) => [entity, 'list'] as const,
    list: (entity: string, filters?: Record<string, any>) =>
      [...queryKeys.entities.lists(entity), ...(filters ? [{ filters }] : [])] as const,
    details: (entity: string) => [entity, 'detail'] as const,
    detail: (entity: string, id: string | number) =>
      [...queryKeys.entities.details(entity), id] as const,
  },

  // Pagination support
  paginated: {
    all: (entity: string) => [entity, 'paginated'] as const,
    list: (entity: string, page: number, limit: number, filters?: Record<string, any>) =>
      [...queryKeys.paginated.all(entity), { page, limit, ...(filters && { filters }) }] as const,
  },

  // Search queries
  search: {
    all: (entity: string) => [entity, 'search'] as const,
    query: (entity: string, searchTerm: string, filters?: Record<string, any>) =>
      [...queryKeys.search.all(entity), { searchTerm, ...(filters && { filters }) }] as const,
  },
} as const;

// Type helpers for query keys
export type QueryKey = readonly unknown[];
export type QueryKeyFactory<T extends QueryKey> = (...args: any[]) => T;

// Utility functions for query key manipulation
export const queryKeyUtils = {
  // Get the base key for an entity
  getBaseKey: (key: QueryKey) => key[0],

  // Check if a key matches a pattern
  matches: (key: QueryKey, pattern: QueryKey) => {
    if (key.length !== pattern.length) return false;
    return pattern.every((segment, index) =>
      typeof segment === 'string' ? key[index] === segment : true
    );
  },

  // Extract filters from a query key
  extractFilters: (key: QueryKey) => {
    const lastSegment = key[key.length - 1];
    return typeof lastSegment === 'object' && lastSegment !== null && 'filters' in lastSegment
      ? (lastSegment as any).filters
      : undefined;
  },

  // Extract ID from a detail query key
  extractId: (key: QueryKey) => {
    const lastSegment = key[key.length - 1];
    return typeof lastSegment === 'string' || typeof lastSegment === 'number'
      ? lastSegment
      : undefined;
  },
};

// Predefined query key patterns for common entities
export const commonQueryKeys = {
  // Add your common entities here
  posts: queryKeys.entities,
  categories: queryKeys.entities,
  comments: queryKeys.entities,
  // ... add more as needed
} as const;
