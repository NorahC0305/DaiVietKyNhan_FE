// import { useApiQuery, useApiMutation, ApiResponse } from './use-queries';
// import { queryKeys } from '@lib/QueryKey';
// import authService from '@/services/auth';
// import { ILoginFormDataRequest, IRegisterFormDataRequest } from '@/models/user/request';

// // Types for auth responses
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   avatar?: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AuthResponse {
//   user: User;
//   accessToken: string;
//   refreshToken: string;
// }

// // Auth query hooks
// export function useUser() {
//   return useApiQuery<ApiResponse<User>>(
//     queryKeys.auth.user(),
//     async () => {
//       // This would typically call an API to get current user info
//       // For now, we'll return a mock response
//       throw new Error('Not implemented yet');
//     },
//     {
//       enabled: false, // Disable by default, enable when needed
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     }
//   );
// }

// export function useUserProfile() {
//   return useApiQuery<ApiResponse<User>>(
//     queryKeys.auth.profile(),
//     async () => {
//       // This would typically call an API to get user profile
//       throw new Error('Not implemented yet');
//     },
//     {
//       enabled: false, // Disable by default, enable when needed
//       staleTime: 10 * 60 * 1000, // 10 minutes
//     }
//   );
// }

// // Auth mutation hooks
// export function useLogin() {
//   return useApiMutation<ApiResponse<AuthResponse>, ILoginFormDataRequest>(
//     authService.login,
//     {
//       successMessage: 'Login successful!',
//       errorMessage: 'Login failed. Please check your credentials.',
//       onSuccess: (data) => {
//         // Handle successful login
//         console.log('Login successful:', data);
//         // You might want to store tokens, redirect, etc.
//       },
//     }
//   );
// }

// export function useRegister() {
//   return useApiMutation<ApiResponse<AuthResponse>, IRegisterFormDataRequest>(
//     authService.register,
//     {
//       successMessage: 'Registration successful!',
//       errorMessage: 'Registration failed. Please try again.',
//       onSuccess: (data) => {
//         // Handle successful registration
//         console.log('Registration successful:', data);
//         // You might want to store tokens, redirect, etc.
//       },
//     }
//   );
// }

// export function useLogout() {
//   return useApiMutation<void, void>(
//     async () => {
//       // This would typically call a logout API
//       // For now, we'll just clear local storage or session
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//     },
//     {
//       successMessage: 'Logged out successfully!',
//       onSuccess: () => {
//         // Invalidate all auth-related queries
//         // This will be handled by the mutation's invalidateQueries option
//       },
//       invalidateQueries: [queryKeys.auth.all],
//     }
//   );
// }

// // Utility hooks for auth state
// export function useAuth() {
//   const userQuery = useUser();
//   const loginMutation = useLogin();
//   const logoutMutation = useLogout();

//   return {
//     user: userQuery.data?.data,
//     isLoading: userQuery.isLoading,
//     isAuthenticated: !!userQuery.data?.data,
//     login: loginMutation.mutate,
//     logout: logoutMutation.mutate,
//     isLoggingIn: loginMutation.isPending,
//     isLoggingOut: logoutMutation.isPending,
//     error: userQuery.error || loginMutation.error || logoutMutation.error,
//   };
// }
