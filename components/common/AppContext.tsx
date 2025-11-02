/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type dispatchDataType = {
  type: string;
  payload: any;
};
export type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  refresh: boolean;
};

const initState: contextType = {
  dispatch: () => {},
  refresh: false,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case 'setRefresh':
      return {
        ...state,
        refresh: !state?.refresh,
      };

    default:
      throw new Error('Action unkonwn');
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ refresh }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        refresh,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error('Unable to use!');
  return context;
}
