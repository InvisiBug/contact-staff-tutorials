import { createContext, useContext as useReactContext, type Dispatch, type SetStateAction } from "react";
import type { Move, Meta, Theme } from "@/lib/types";

export type MoveFilterKey = Exclude<keyof Meta, "id">;
export type MoveFilters = Partial<Record<MoveFilterKey, string[]>>;
export const META_PROPERTIES = ["status", "family", "category", "need", "mastery", "difficulty", "ingest", "propType", "where"] as const satisfies readonly MoveFilterKey[];
export type MetaProperty = (typeof META_PROPERTIES)[number];

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
  moves: Move[];
  visibleProperties: MetaProperty[];
  toggleProperty: (property: MetaProperty) => void;
  showUserData: boolean;
  setShowUserData: Dispatch<SetStateAction<boolean>>;
  filters: MoveFilters;
  setFilters: Dispatch<SetStateAction<MoveFilters>>;
}
