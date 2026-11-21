import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/lib/components";

const PageShell = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isLightboxEnabledRoute = location.pathname !== "/";

  return (
    <div className={["page-shell min-h-screen", isLightboxEnabledRoute ? "lightbox-enabled" : ""].join(" ")}>
      <NavBar />

      <main>{children}</main>
    </div>
  );
};

export default PageShell;
