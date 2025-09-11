import { useApiQuery, useApiMutation, useInfiniteApiQuery, PaginatedResponse, ApiResponse } from './use-queries';
import { queryKeys } from '@lib/QueryKey';

// Generic entity types
export interface Entity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntityRequest {
  [key: string]: any;
}

export interface UpdateEntityRequest {
  id: string | number;
  [key: string]: any;
}

export interface EntityFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

// Generic CRUD hooks for any entity
export function useEntityList<T extends Entity>(
  entityName: string,
  filters?: EntityFilters,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useApiQuery<PaginatedResponse<T>>(
    queryKeys.entities.list(entityName, filters),
    async () => {
      // This would typically call your API
      // For now, we'll throw an error to indicate it needs implementation
      throw new Error(`useEntityList for ${entityName} not implemented yet`);
    },
    {
      enabled: options?.enabled ?? true,
      staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    }
  );
}

export function useEntityDetail<T extends Entity>(
  entityName: string,
  id: string | number,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useApiQuery<ApiResponse<T>>(
    queryKeys.entities.detail(entityName, id),
    async () => {
      // This would typically call your API
      throw new Error(`useEntityDetail for ${entityName} not implemented yet`);
    },
    {
      enabled: options?.enabled ?? !!id,
      staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes
    }
  );
}

export function useInfiniteEntityList<T extends Entity>(
  entityName: string,
  filters?: EntityFilters,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useInfiniteApiQuery<T>(
    queryKeys.paginated.list(entityName, 1, 10, filters),
    async ({ pageParam = 1 }) => {
      // This would typically call your API with pagination
      throw new Error(`useInfiniteEntityList for ${entityName} not implemented yet`);
    },
    {
      enabled: options?.enabled ?? true,
      staleTime: options?.staleTime ?? 5 * 60 * 1000,
    }
  );
}

export function useCreateEntity<T extends Entity>(
  entityName: string,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: ApiResponse<T>) => void;
  }
) {
  return useApiMutation<ApiResponse<T>, CreateEntityRequest>(
    async (data) => {
      // This would typically call your API
      throw new Error(`useCreateEntity for ${entityName} not implemented yet`);
    },
    {
      successMessage: options?.successMessage ?? `${entityName} created successfully!`,
      errorMessage: options?.errorMessage ?? `Failed to create ${entityName}`,
      invalidateQueries: [queryKeys.entities.all(entityName)],
      onSuccess: options?.onSuccess,
    }
  );
}

export function useUpdateEntity<T extends Entity>(
  entityName: string,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: ApiResponse<T>) => void;
  }
) {
  return useApiMutation<ApiResponse<T>, UpdateEntityRequest>(
    async ({ id, ...data }) => {
      // This would typically call your API
      throw new Error(`useUpdateEntity for ${entityName} not implemented yet`);
    },
    {
      successMessage: options?.successMessage ?? `${entityName} updated successfully!`,
      errorMessage: options?.errorMessage ?? `Failed to update ${entityName}`,
      invalidateQueries: [queryKeys.entities.all(entityName)],
      onSuccess: options?.onSuccess,
    }
  );
}

export function useDeleteEntity(
  entityName: string,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: () => void;
  }
) {
  return useApiMutation<void, { id: string | number }>(
    async ({ id }) => {
      // This would typically call your API
      throw new Error(`useDeleteEntity for ${entityName} not implemented yet`);
    },
    {
      successMessage: options?.successMessage ?? `${entityName} deleted successfully!`,
      errorMessage: options?.errorMessage ?? `Failed to delete ${entityName}`,
      invalidateQueries: [queryKeys.entities.all(entityName)],
      onSuccess: options?.onSuccess,
    }
  );
}

// Search hook
export function useEntitySearch<T extends Entity>(
  entityName: string,
  searchTerm: string,
  filters?: EntityFilters,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useApiQuery<PaginatedResponse<T>>(
    queryKeys.search.query(entityName, searchTerm, filters),
    async () => {
      // This would typically call your search API
      throw new Error(`useEntitySearch for ${entityName} not implemented yet`);
    },
    {
      enabled: options?.enabled ?? !!searchTerm,
      staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2 minutes for search
    }
  );
}

// Utility hook for entity operations
export function useEntityOperations<T extends Entity>(entityName: string) {
  const createMutation = useCreateEntity<T>(entityName);
  const updateMutation = useUpdateEntity<T>(entityName);
  const deleteMutation = useDeleteEntity(entityName);

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}
