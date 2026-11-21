import { MoveCard } from "@/lib/components";
import { useMovesContext } from "../context";

const HomePage = () => {
  const { staffDatabase } = useMovesContext();

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {staffDatabase.map((move) => (
        <div key={move.id} className="mb-6 break-inside-avoid">
          <MoveCard move={move} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
