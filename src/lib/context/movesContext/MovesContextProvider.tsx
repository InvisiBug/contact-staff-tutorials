import { useState, type FC, type PropsWithChildren } from "react";
import { enrichStaffDatabase, getInitialTheme, getStaffDatabase, getUniqueMetadataProperties, getUserMoves } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { META_PROPERTIES, MovesContext, type MetaProperty, type MoveFilters } from "./useMovesContext";

export const MovesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [showUserData, setShowUserData] = useState(true);
  const [visibleProperties, setVisibleProperties] = useState<MetaProperty[]>([...META_PROPERTIES]);
  const [filters, setFilters] = useState<MoveFilters>({});

  const toggleProperty = (property: MetaProperty) => {
    setVisibleProperties((current) => (current.includes(property) ? current.filter((visibleProperty) => visibleProperty !== property) : [...current, property]));
  };

  const moves = enrichStaffDatabase(getStaffDatabase(), getUserMoves()).filter((move) => move.gif.length > 0);

  console.log("🚀 ~ MovesContextProvider ~ moves:", moves);

  const metadata = getUniqueMetadataProperties(moves);

  return <MovesContext.Provider value={{ theme, setTheme, moves, visibleProperties, toggleProperty, showUserData, setShowUserData, filters, setFilters }}>{children}</MovesContext.Provider>;
};
