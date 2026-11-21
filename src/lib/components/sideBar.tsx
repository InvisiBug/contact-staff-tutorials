import type { FC, PropsWithChildren } from "react";

interface SideBarProps extends PropsWithChildren {
  title?: string;
  label?: string;
  className?: string;
}

const SideBar: FC<SideBarProps> = ({ children, title, label = "Sidebar", className = "" }) => {
  return (
    <aside aria-label={label} className={`h-fit rounded-[0.9rem] border border-(--line) bg-(--surface-soft) p-4 lg:sticky lg:top-6 ${className}`}>
      {title && <h2 className="m-0 mb-4 text-lg font-semibold">{title}</h2>}
      <div className="grid gap-4">{children}</div>
    </aside>
  );
};

export default SideBar;
