"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { queryClient } from "@lib/QueryClient";

interface QueryProviderWrapperProps {
  children: ReactNode;
}

export default function QueryProviderWrapper({
  children,
}: QueryProviderWrapperProps) {
  // Create a new QueryClient instance for each user session
  // This ensures that data is not shared between different users
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* React Query DevTools - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}
