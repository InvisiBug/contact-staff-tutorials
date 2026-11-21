import { useState, type FC, type PropsWithChildren } from "react";
import { getInitialTheme } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { MovesContext } from "./useMovesContext";

export const MovesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return <MovesContext.Provider value={{ theme, setTheme }}>{children}</MovesContext.Provider>;
};
