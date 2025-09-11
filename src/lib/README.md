# TanStack Query Setup

This directory contains a comprehensive and maintainable TanStack Query (React Query) setup for the project.

## 📁 File Structure

```
src/lib/
├── query-client.ts      # Query client configuration
├── query-keys.ts        # Type-safe query key factory
├── query-provider.tsx   # Query provider component
├── query-utils.ts       # Utility functions for query management
└── index.ts            # Barrel exports

src/hooks/
├── use-queries.ts       # Generic query and mutation hooks
├── use-auth-queries.ts  # Authentication-specific hooks
├── use-entity-queries.ts # Generic CRUD hooks for entities
└── index.ts            # Barrel exports
```

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { useApiQuery, useApiMutation } from '@/hooks';

// Simple query
function UserProfile() {
  const { data, isLoading, error } = useApiQuery(
    ['user', 'profile'],
    () => fetch('/api/user/profile').then(res => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Hello, {data.name}!</div>;
}

// Simple mutation
function CreatePost() {
  const createPost = useApiMutation(
    (data) => fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json()),
    {
      successMessage: 'Post created successfully!',
      invalidateQueries: [['posts']]
    }
  );

  return (
    <button onClick={() => createPost.mutate({ title: 'New Post' })}>
      Create Post
    </button>
  );
}
```

### 2. Using Type-Safe Query Keys

```tsx
import { queryKeys } from '@/lib';

// Use the query key factory
const userQuery = useApiQuery(
  queryKeys.auth.user(),
  fetchUser
);

const postsQuery = useApiQuery(
  queryKeys.entities.list('posts', { published: true }),
  fetchPosts
);
```

### 3. Authentication Hooks

```tsx
import { useAuth, useLogin, useLogout } from '@/hooks';

function AuthComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const loginMutation = useLogin();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={() => loginMutation.mutate({ email, password })}>
      Login
    </button>
  );
}
```

### 4. Generic Entity Operations

```tsx
import { useEntityList, useEntityOperations } from '@/hooks';

function PostsList() {
  const { data: posts, isLoading } = useEntityList('posts', {
    published: true,
    sortBy: 'createdAt'
  });

  const { create, update, delete: deletePost } = useEntityOperations('posts');

  return (
    <div>
      {posts?.data.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => update({ id: post.id, title: 'Updated' })}>
            Edit
          </button>
          <button onClick={() => deletePost({ id: post.id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Configuration

### Query Client Settings

The query client is configured with sensible defaults:

- **Stale Time**: 5 minutes (data stays fresh)
- **Garbage Collection Time**: 10 minutes (cache cleanup)
- **Retry Logic**: Smart retry with exponential backoff
- **Error Handling**: Automatic error notifications via toast
- **DevTools**: Enabled in development mode

### Customizing Configuration

```tsx
// In query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

## 🎯 Best Practices

### 1. Query Key Management

Always use the query key factory for consistency:

```tsx
// ✅ Good
const queryKey = queryKeys.entities.detail('posts', postId);

// ❌ Avoid
const queryKey = ['posts', postId];
```

### 2. Error Handling

The setup includes automatic error handling with toast notifications. Customize as needed:

```tsx
const mutation = useApiMutation(
  createPost,
  {
    onError: (error) => {
      // Custom error handling
      console.error('Custom error:', error);
    },
    errorMessage: 'Custom error message'
  }
);
```

### 3. Optimistic Updates

Use optimistic updates for better UX:

```tsx
import { useOptimisticMutation } from '@/hooks';

const updatePost = useOptimisticMutation(
  updatePostApi,
  {
    queryKey: queryKeys.entities.detail('posts', postId),
    optimisticUpdate: (oldData, variables) => ({
      ...oldData,
      ...variables
    }),
    rollbackUpdate: (oldData) => oldData,
  }
);
```

### 4. Infinite Queries

For paginated data:

```tsx
import { useInfiniteApiQuery } from '@/hooks';

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteApiQuery(
  queryKeys.paginated.list('posts', 1, 10),
  ({ pageParam = 1 }) => fetchPosts({ page: pageParam })
);
```

## 🛠️ Advanced Features

### 1. Prefetching

```tsx
import { usePrefetchQuery } from '@/hooks';

function PostCard({ postId }) {
  const { prefetch } = usePrefetchQuery();

  const handleMouseEnter = () => {
    prefetch(
      queryKeys.entities.detail('posts', postId),
      () => fetchPost(postId)
    );
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      Post Card
    </div>
  );
}
```

### 2. Query Invalidation

```tsx
import { useQueryUtils } from '@/lib';

function PostActions() {
  const queryUtils = useQueryUtils();

  const handleDelete = async () => {
    await deletePost(postId);
    // Invalidate all post-related queries
    queryUtils.invalidateEntity('posts');
  };
}
```

### 3. Custom Hooks

Create domain-specific hooks:

```tsx
// hooks/use-posts.ts
export function usePosts(filters?: PostFilters) {
  return useEntityList<Post>('posts', filters);
}

export function usePost(id: string) {
  return useEntityDetail<Post>('posts', id);
}

export function useCreatePost() {
  return useCreateEntity<Post>('posts', {
    successMessage: 'Post created successfully!'
  });
}
```

## 🧪 Testing

The setup is designed to be test-friendly:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderWithQueryClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
}
```

## 📚 Examples

Check the `src/examples/` directory for complete working examples:

- `auth-example.tsx` - Authentication flow
- `entity-example.tsx` - CRUD operations

## 🔄 Migration Guide

If you're migrating from a different data fetching solution:

1. Replace `useEffect` + `useState` patterns with `useApiQuery`
2. Replace manual API calls with `useApiMutation`
3. Use the query key factory for consistent cache management
4. Leverage automatic error handling and loading states

## 🐛 Troubleshooting

### Common Issues

1. **Queries not refetching**: Check if query keys are consistent
2. **Stale data**: Adjust `staleTime` in query client config
3. **Memory leaks**: Ensure proper cleanup in `useEffect`
4. **Type errors**: Use proper TypeScript generics with hooks

### Debug Mode

Enable React Query DevTools in development:

```tsx
// Already included in QueryProvider
<ReactQueryDevtools initialIsOpen={false} />
```

## 📖 Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Query Key Factory Pattern](https://tkdodo.eu/blog/effective-react-query-keys)
