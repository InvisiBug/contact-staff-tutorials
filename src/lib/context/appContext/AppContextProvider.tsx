import { useState, type FC, type PropsWithChildren } from "react";
import { getInitialTheme } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { ThemeContext } from "./useAppContext";

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
