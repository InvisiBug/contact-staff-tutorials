import { useMemo } from "react";
import { MoveCard, MovesTopBar, SideBar } from "@/lib/components";
import { useMovesContext } from "../context";
import type { Move } from "@/lib/types";
import type { MoveFilterKey } from "../context/movesContext/useMovesContext";

const getFilterValues = (move: Move, key: MoveFilterKey): string[] => {
  const value = move.meta[key];
  const stringValue = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);

  return key === "family" || key === "category" ? stringValue.split(",").map((item) => item.trim()) : [stringValue];
};

const moveMatchesFilters = (move: Move, filters: Partial<Record<MoveFilterKey, string[]>>): boolean =>
  Object.entries(filters).every(([key, selectedValues]) => {
    if (!selectedValues?.length) {
      return true;
    }

    return selectedValues.some((selectedValue) => getFilterValues(move, key as MoveFilterKey).includes(selectedValue));
  });

const HomePage = () => {
  const { staffDatabase, filters } = useMovesContext();
  const visibleMoves = useMemo(() => staffDatabase.filter((move) => moveMatchesFilters(move, filters)), [filters, staffDatabase]);

  return (
    <div className="mx-auto grid items-start gap-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <SideBar title="Move filters" className="overflow-y-auto lg:top-0! lg:h-screen!" />

      <section>
        <MovesTopBar moveCount={visibleMoves.length} />

        <div className="pl-4">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-6">
            {visibleMoves.map((move) => (
              <div key={move.meta.id} className="mb-6 break-inside-avoid">
                <MoveCard move={move} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
