import type { FC } from "react";
import { META_PROPERTIES, useMovesContext, type MetaProperty } from "@/lib/context";
import SideBarDropdown from "./sideBar/components/dropdown";

interface MovesTopBarProps {
  moveCount: number;
}

const MovesTopBar: FC<MovesTopBarProps> = ({ moveCount }) => {
  const { moves, filters, setFilters, visibleProperties, toggleProperty, showUserData, setShowUserData } = useMovesContext();
  const statusOptions = [...new Set(moves.map((move) => move.meta.status))].sort().map((status) => ({ label: status, value: status }));
  const propertyOptions = META_PROPERTIES.map((property) => ({
    label: property.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase()),
    value: property,
  }));

  const toggleStatus = (value: string) => {
    setFilters((current) => {
      const selectedStatuses = current.status ?? [];
      const nextStatuses = selectedStatuses.includes(value) ? selectedStatuses.filter((status) => status !== value) : [...selectedStatuses, value];

      return { ...current, status: nextStatuses };
    });
  };

  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between border-b border-(--line) bg-(--surface) px-4 py-4">
      <div className="flex items-center gap-4">
        <SideBarDropdown overlay label="Status" options={statusOptions} selectedValues={filters.status ?? []} onToggle={toggleStatus} />
        <SideBarDropdown overlay label="Properties" options={propertyOptions} selectedValues={visibleProperties} onToggle={(property) => toggleProperty(property as MetaProperty)} />
        <button
          type="button"
          aria-pressed={showUserData}
          onClick={() => setShowUserData((isShowing) => !isShowing)}
          className="rounded-md border border-(--line) px-2 py-1 text-xs font-medium text-(--text-muted) hover:text-(--accent)"
        >
          {showUserData ? "User data" : "Move data"}
        </button>
      </div>
    </header>
  );
};

export default MovesTopBar;
