import { useState } from "react";
import { MoveCard, SideBar, SideBarDropdown } from "@/lib/components";
import { useMovesContext } from "../context";
import type { Meta } from "@/lib/types";

type MoveFilterKey = "name" | keyof Meta;

const filterLabels: Record<MoveFilterKey, string> = {
  name: "Name",
  status: "Status",
  family: "Family",
  category: "Category",
  need: "Need",
  difficulty: "Difficulty",
  ingest: "Ingest",
  type: "Type",
  where: "Where learned",
};

const getFilterValue = (value: string | number | boolean): string => (typeof value === "boolean" ? (value ? "Yes" : "No") : String(value));

const HomePage = () => {
  const { staffDatabase } = useMovesContext();
  const [selectedFilters, setSelectedFilters] = useState<Partial<Record<MoveFilterKey, string[]>>>({});

  const filterOptions = (key: MoveFilterKey) => {
    const values = staffDatabase.map((move) => (key === "name" ? move.name : getFilterValue(move.meta[key])));

    return [...new Set(values)].sort((first, second) => first.localeCompare(second, undefined, { numeric: true })).map((value) => ({ label: value, value }));
  };

  const toggleFilter = (key: MoveFilterKey, value: string) => {
    setSelectedFilters((current) => {
      const selectedValues = current[key] ?? [];
      const nextValues = selectedValues.includes(value) ? selectedValues.filter((selectedValue) => selectedValue !== value) : [...selectedValues, value];

      return { ...current, [key]: nextValues };
    });
  };

  return (
    <div className="mx-auto grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <SideBar title="Move filters" className="overflow-y-auto lg:top-0! lg:h-screen!">
        {(Object.keys(filterLabels) as MoveFilterKey[]).map((key) => (
          <SideBarDropdown key={key} label={filterLabels[key]} options={filterOptions(key)} selectedValues={selectedFilters[key] ?? []} onToggle={(value) => toggleFilter(key, value)} />
        ))}
      </SideBar>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-6">
        {staffDatabase.map((move) => (
          <div key={move.id} className="mb-6 break-inside-avoid">
            <MoveCard move={move} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
