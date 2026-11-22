import type { FC } from "react";
import { useMovesContext } from "@/lib/context";
import type { Meta } from "@/lib/types";
import SideBarDropdown from "./components/dropdown";

import type { MoveFilterKey } from "@/lib/context/movesContext/useMovesContext";

interface SideBarProps {
  title?: string;
  label?: string;
  className?: string;
}

const metaKeys = ["family", "category", "need", "difficulty", "ingest", "propType", "where"] as const satisfies readonly MoveFilterKey[];

const getFilterLabel = (key: MoveFilterKey): string => key.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase());

const getFilterValue = (value: string | number | boolean): string => (typeof value === "boolean" ? (value ? "Yes" : "No") : String(value));

const SideBar: FC<SideBarProps> = ({ title, label = "Sidebar", className = "" }) => {
  const { staffDatabase, filters, setFilters } = useMovesContext();

  const filterOptions = (key: MoveFilterKey) => {
    const values = staffDatabase.flatMap((move) => {
      const value = getFilterValue(move.meta[key]);
      return key === "family" || key === "category" ? value.split(",").map((item) => item.trim()) : [value];
    });

    return [...new Set(values)].sort((first, second) => first.localeCompare(second, undefined, { numeric: true })).map((value) => ({ label: value, value }));
  };

  const toggleFilter = (key: MoveFilterKey, value: string) => {
    setFilters((current) => {
      const selectedValues = current[key] ?? [];
      const nextValues = selectedValues.includes(value) ? selectedValues.filter((selectedValue) => selectedValue !== value) : [...selectedValues, value];

      return { ...current, [key]: nextValues };
    });
  };

  return (
    <aside aria-label={label} className={`h-fit rounded-[0.9rem] border border-(--line) bg-(--surface-soft) p-4 lg:sticky lg:top-6 ${className}`}>
      {title && <h2 className="m-0 mb-4 text-lg font-semibold">{title}</h2>}
      <div className="grid gap-4">
        {metaKeys.map((key) => (
          <SideBarDropdown key={key} label={getFilterLabel(key)} options={filterOptions(key)} selectedValues={filters[key] ?? []} onToggle={(value) => toggleFilter(key, value)} />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
