import type { FC } from "react";
import type { Move } from "@/lib/types";

const metaLabels: Record<keyof Move["meta"], string> = {
  status: "Status",
  family: "Family",
  category: "Category",
  need: "Need",
  difficulty: "Difficulty",
  ingest: "Ingest",
  type: "Type",
  where: "Where",
};

const MoveCard: FC<MoveCardProps> = ({ move }) => {
  console.log("🚀 ~ MoveCard ~ move:", move);

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
          {(Object.entries(move.meta) as Array<[keyof Move["meta"], Move["meta"][keyof Move["meta"]]]>).map(([key, value]) => (
            <div key={key} className="grid grid-cols-[minmax(6rem,auto)_1fr] gap-3">
              <dt className="font-medium text-(--text-muted)">{metaLabels[key]}</dt>
              <dd className="m-0 text-(--text)">{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</dd>
            </div>
          ))}
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
