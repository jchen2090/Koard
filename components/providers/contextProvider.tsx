"use client";

import { Dispatch, ReactNode, createContext, useContext, useMemo, useReducer } from "react";
import { appReducer } from "../../reducers/appReducer";
import { actionTypes } from "../../reducers/actions";
import { initialStateType } from "./types";

const initialState: initialStateType = {
  data: [],
  changes: { added: [], deleted: [], updated: [] },
  isSynced: true,
};

interface contextType {
  state: initialStateType;
  dispatch: Dispatch<actionTypes>;
}

const AppContext = createContext<contextType | null>(null);

export function ContextProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValues = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be wrapped around contextprovider");
  }
  return context;
}
