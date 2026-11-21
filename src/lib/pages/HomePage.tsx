import { useState } from "react";
import { MoveCard, SideBar } from "@/lib/components";
import { useMovesContext } from "../context";

const HomePage = () => {
  const { staffDatabase } = useMovesContext();

  return (
    <div className="mx-auto grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <SideBar title="Move filters" className="overflow-y-auto lg:top-0! lg:h-screen!" />

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
