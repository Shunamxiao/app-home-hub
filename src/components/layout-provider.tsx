'use client';

import { createContext, useState, ReactNode, useMemo } from 'react';
import { LoadingOverlay } from './loading-overlay';

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({
    isLoading,
    setLoading: setIsLoading,
  }), [isLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
}
