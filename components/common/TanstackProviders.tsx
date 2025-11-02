'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContext from './AppContext';
import { Toaster } from '../ui/toaster';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function TanstackProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="841316020944-tc0q9n9b72kkv4c20a19q4cmt7paf8rn.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AppContext>
          {children}
          <Toaster />
        </AppContext>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default TanstackProvider;
