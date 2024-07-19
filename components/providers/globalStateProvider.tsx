"use client";

import { ReactNode, useReducer, useMemo, createContext, Dispatch, useContext } from "react";
import { globalStateType } from "./types";
import { globalActionTypes } from "@/reducers/global/actions";
import { globalReducer } from "@/reducers/global/globalReducer";

const initialState = {
  isSynced: true,
};

interface contextType {
  state: globalStateType;
  dispatch: Dispatch<globalActionTypes>;
}

const AppContext = createContext<contextType | null>(null);

export function GlobalContextProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const contextValues = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}

export function useGlobalContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be wrapped around contextprovider");
  }
  return context;
}
