import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { NavBar, SideBar } from "@/lib/components";

const PageShell = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isLightboxEnabledRoute = location.pathname !== "/";

  return (
    <div className={["page-shell min-h-screen", isLightboxEnabledRoute ? "lightbox-enabled" : ""].join(" ")}>
      <NavBar />

      <div className="mx-auto grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <SideBar title="Move filters" className="lg:top-0! lg:h-screen!">
          <p className="m-0 text-sm text-(--text-muted)">Sorting and filtering options will go here.</p>
        </SideBar>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default PageShell;
