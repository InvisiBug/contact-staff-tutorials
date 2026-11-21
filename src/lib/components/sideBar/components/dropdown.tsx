import type { FC } from "react";

const SideBarDropdown: FC<SideBarDropdownProps> = ({ label, options, selectedValues, onToggle }) => {
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
export default SideBarDropdown;

interface SideBarDropdownProps {
  label: string;
  options: SideBarDropdownOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export interface SideBarDropdownOption {
  label: string;
  value: string;
}
