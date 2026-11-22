import { createContext, useContext as useReactContext, type Dispatch, type SetStateAction } from "react";
import type { Entry, Meta, Theme } from "@/lib/types";

export type MoveFilterKey = Exclude<keyof Meta, "id">;
export type MoveFilters = Partial<Record<MoveFilterKey, string[]>>;

export const MovesContext = createContext<MovesContext | null>(null);

export const useMovesContext = () => {
  const contextValue = useReactContext(MovesContext);

  if (!contextValue) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }

  return contextValue;
};

interface MovesContext {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  staffDatabase: Entry[];
  filters: MoveFilters;
  setFilters: Dispatch<SetStateAction<MoveFilters>>;
}
