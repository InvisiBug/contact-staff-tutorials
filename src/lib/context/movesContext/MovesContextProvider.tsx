import { useState, type FC, type PropsWithChildren } from "react";
import { enrichStaffDatabase, getInitialTheme, getStaffDatabase, getUniqueMetadataProperties, getUserMoves } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { MovesContext, type MoveFilters } from "./useMovesContext";

export const MovesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [filters, setFilters] = useState<MoveFilters>({});

  const moves = enrichStaffDatabase(getStaffDatabase(), getUserMoves())
    .filter((move) => move.gif.length > 0)
    .slice(0, 2);

  console.log("🚀 ~ MovesContextProvider ~ moves:", moves);

  const metadata = getUniqueMetadataProperties(moves);

  return <MovesContext.Provider value={{ theme, setTheme, moves, filters, setFilters }}>{children}</MovesContext.Provider>;
};
