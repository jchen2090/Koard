"use client";

import { Dispatch, ReactNode, createContext, useContext, useMemo, useReducer } from "react";
import { boardReducer } from "../../reducers/board/boardReducer";
import { actionTypes } from "../../reducers/board/actions";
import { initialStateType } from "./types";
import { DataSchema } from "@/app/project/page";

interface contextType {
  state: initialStateType;
  dispatch: Dispatch<actionTypes>;
}

const AppContext = createContext<contextType | null>(null);

export function BoardContextProvider({
  children,
  initialData,
}: Readonly<{ children: ReactNode; initialData: DataSchema[] }>) {
  const initialState: initialStateType = {
    data: initialData,
    changes: { added: [], deleted: [], updated: [] },
  };
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const contextValues = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}

export function useBoardContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be wrapped around contextprovider");
  }
  return context;
}
