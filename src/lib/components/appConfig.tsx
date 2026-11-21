import { useEffect, type FC, type PropsWithChildren } from "react";
import { useAppContext } from "@/lib/context";
import { persistTheme } from "@/lib/helpers";

const AppConfig: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useAppContext();

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  return <>{children}</>;
};

export default AppConfig;
