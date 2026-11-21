import type { FC, PropsWithChildren } from "react";

export interface SideBarDropdownOption {
  label: string;
  value: string;
}

interface SideBarDropdownProps {
  label: string;
  options: SideBarDropdownOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

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

export const SideBarDropdown: FC<SideBarDropdownProps> = ({ label, options, selectedValues, onToggle }) => {
  return (
    <details className="w-full rounded-md border border-(--line) bg-(--surface)">
      <summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">{label}</summary>

      <div className="grid gap-1 border-t border-(--line) p-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option.value)}
              className={`w-full rounded px-2 py-1.5 text-left text-sm transition-colors ${isSelected ? "bg-(--text) text-(--surface)" : "text-(--text) hover:bg-(--surface-soft)"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </details>
  );
};

export default SideBar;
