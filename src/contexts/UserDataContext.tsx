'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { IMeResponse } from '@models/user/response';
import { useGlobalUserData } from '@hooks/useUser';

interface UserDataContextType {
  userData: IMeResponse["data"] | null;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
  updateUserData: (newData: IMeResponse["data"] | null) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
  initialUser?: IMeResponse["data"] | null;
}

export function UserDataProvider({ children, initialUser }: UserDataProviderProps) {
  const { userData, isLoading, refreshUserData, updateUserData } = useGlobalUserData(initialUser);

  return (
    <UserDataContext.Provider value={{
      userData,
      isLoading,
      refreshUserData,
      updateUserData,
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserDataContext must be used within a UserDataProvider');
  }
  return context;
}

// Safe hook that doesn't throw if context is not available
export function useUserDataContextSafe() {
  const context = useContext(UserDataContext);
  return context;
}
