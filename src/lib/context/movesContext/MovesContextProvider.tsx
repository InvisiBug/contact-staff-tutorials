import { useState, type FC, type PropsWithChildren } from "react";
import { getInitialTheme, getStaffDatabase } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { MovesContext, type MoveFilters } from "./useMovesContext";

export const MovesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [filters, setFilters] = useState<MoveFilters>({});
  console.log("🚀 ~ MovesContextProvider ~ filters:", filters);
  const staffDatabase = getStaffDatabase();

  return <MovesContext.Provider value={{ theme, setTheme, staffDatabase, filters, setFilters }}>{children}</MovesContext.Provider>;
};
