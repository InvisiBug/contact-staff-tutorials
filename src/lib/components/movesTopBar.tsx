import type { FC } from "react";
import { useMovesContext } from "@/lib/context";
import SideBarDropdown from "./sideBar/components/dropdown";

interface MovesTopBarProps {
  moveCount: number;
}

const MovesTopBar: FC<MovesTopBarProps> = ({ moveCount }) => {
  const { staffDatabase, filters, setFilters } = useMovesContext();
  const statusOptions = [...new Set(staffDatabase.map((move) => move.meta.status))].sort().map((status) => ({ label: status, value: status }));

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
        <SideBarDropdown label="Status" options={statusOptions} selectedValues={filters.status ?? []} onToggle={toggleStatus} />
      </div>
    </header>
  );
};

export default MovesTopBar;
