import type { FC } from "react";
import type { Meta, Move } from "@/lib/types";
import { useMovesContext } from "@/lib/context";
import { BooleanIndicator, CategoryIndicator, DifficultyIndicator, FamilyIndicator, MasteryIndicator, NeedIndicator, StatusIndicator, TextIndicator } from "../indicators";

const formatMetaValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
};

const MoveCard: FC<MoveCardProps> = ({ move }) => {
  const { showUserData } = useMovesContext();

  const enrichedMove: Move = {
    ...move,
    meta: {
      ...move.meta,
      ...Object.fromEntries(Object.entries(move.userData ?? {}).filter(([, value]) => value !== undefined)),
    },
  };

  const displayedMove = showUserData ? enrichedMove : move;

  return (
    <article className="flex h-full max-w-full flex-col overflow-hidden rounded-[0.9rem] border border-(--line) bg-(--surface-soft) text-inherit">
      {move.gif.length > 0 && (
        <div className="grid gap-2">
          {move.gif.map((gif, index) => (
            <img key={`${move.name}-gif-${index}`} src={gif} alt={`${move.name} demonstration ${index + 1}`} className="block w-full  object-cover" loading="lazy" />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 p-4">
        <h2 className="m-0 text-xl font-semibold">{move.name}</h2>

        <dl className="m-0 grid gap-0 text-sm">
          {Object.entries(displayedMove.meta)
            .filter(([property]) => property !== "id")
            .map(([property, value]) => {
              const isOverridden = showUserData && Object.prototype.hasOwnProperty.call(move.userData ?? {}, property);

              return (
                <div key={property} className="grid grid-cols-[minmax(6rem,auto)_1fr] gap-3">
                  <dt className={`font-medium ${isOverridden ? "text-(--accent)" : "text-(--text-muted)"}`}>{property}</dt>
                  <dd className={`m-0 ${isOverridden ? "text-(--accent)" : "text-(--text)"}`}>
                    {property === "status" ? (
                      <StatusIndicator value={value as Meta["status"]} />
                    ) : property === "family" ? (
                      <FamilyIndicator value={value as Meta["family"]} />
                    ) : property === "category" ? (
                      <CategoryIndicator value={value as Meta["category"]} />
                    ) : property === "need" ? (
                      <NeedIndicator value={value as Meta["need"]} />
                    ) : property === "mastery" ? (
                      <MasteryIndicator value={value as Meta["mastery"]} />
                    ) : property === "difficulty" ? (
                      <DifficultyIndicator value={value as Meta["difficulty"]} />
                    ) : property === "ingest" ? (
                      <BooleanIndicator value={value as Meta["ingest"]} />
                    ) : property === "propType" || property === "where" ? (
                      <TextIndicator value={value as string} />
                    ) : (
                      formatMetaValue(value)
                    )}
                  </dd>
                </div>
              );
            })}
        </dl>

        {/* {move.text && <p className="m-0 whitespace-pre-wrap text-sm leading-6 text-(--text)">{move.text}</p>} */}
      </div>
    </article>
  );
};

export default MoveCard;

interface MoveCardProps {
  move: Move;
}
