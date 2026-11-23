import type { FC, ReactNode } from "react";
import type { Categories, Family, Meta, Statuses } from "@/lib/types";

type IndicatorProps = {
  children: ReactNode;
  className?: string;
};

const Indicator: FC<IndicatorProps> = ({ children, className = "" }) => <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;

const formatLabel = (value: string): string => value.replace(/\b\w/g, (character) => character.toUpperCase());

const statusClasses: Record<Statuses, string> = {
  next: "border-[#b58a35] bg-[#96732d] text-[#f4efe8]",
  learning: "border-[#a56540] bg-[#995d3a] text-[#f4efe8]",
  training: "border-[#4b83c1] bg-[#3f77b3] text-[#f4efe8]",
  learned: "border-[#4e9878] bg-[#438667] text-[#f4efe8]",
};

export const StatusIndicator: FC<{ value: Statuses; className?: string }> = ({ value, className }) => <Indicator className={`${statusClasses[value]} ${className ?? ""}`}>{value.charAt(0).toUpperCase() + value.slice(1)}</Indicator>;

const familyClasses: Record<Family, string> = {
  acro: "border-[#4a4a4a] bg-[#393939] text-[#f4efe8]",
  angel: "border-[#b38a35] bg-[#98742e] text-[#f4efe8]",
  arms: "border-[#965473] bg-[#824866] text-[#f4efe8]",
  "body roll": "border-[#80599b] bg-[#704b8b] text-[#f4efe8]",
  "chi folds": "border-[#865fa0] bg-[#76528e] text-[#f4efe8]",
  conveyor: "border-[#8b6b57] bg-[#795b49] text-[#f4efe8]",
  elbow: "border-[#4e886b] bg-[#3e755a] text-[#f4efe8]",
  fishtail: "border-[#b36b3c] bg-[#a35c32] text-[#f4efe8]",
  "geometric patterns": "border-[#ad8731] bg-[#936d25] text-[#f4efe8]",
  halo: "border-[#80599b] bg-[#704b8b] text-[#f4efe8]",
  isolations: "border-[#727272] bg-[#666666] text-[#f4efe8]",
  journey: "border-[#9b7966] bg-[#896956] text-[#f4efe8]",
  linears: "border-[#ad8731] bg-[#936d25] text-[#f4efe8]",
  lucero: "border-[#4a4a4a] bg-[#393939] text-[#f4efe8]",
  matrix: "border-[#b75c5c] bg-[#a94d4d] text-[#f4efe8]",
  neck: "border-[#727272] bg-[#666666] text-[#f4efe8]",
  other: "border-[#9b7966] bg-[#896956] text-[#f4efe8]",
  shoulder: "border-[#80599b] bg-[#704b8b] text-[#f4efe8]",
  snes: "border-[#4b83c1] bg-[#3f77b3] text-[#f4efe8]",
  stalls: "border-[#4e9878] bg-[#438667] text-[#f4efe8]",
  steve: "border-[#4b83c1] bg-[#3f77b3] text-[#f4efe8]",
  tiptail: "border-[#9b7966] bg-[#896956] text-[#f4efe8]",
  weaves: "border-[#b36b3c] bg-[#a35c32] text-[#f4efe8]",
};

export const FamilyIndicator: FC<{ value: [Family]; className?: string }> = ({ value, className }) => {
  const family = value[0];

  return <Indicator className={`${familyClasses[family]} ${className ?? ""}`}>{formatLabel(family)}</Indicator>;
};

const categoryClasses: Record<Categories, string> = {
  transfer: "border-[#4b83c1] bg-[#3f77b3] text-[#f4efe8]",
  combo: "border-[#865fa0] bg-[#76528e] text-[#f4efe8]",
  move: "border-[#4e9878] bg-[#438667] text-[#f4efe8]",
  foundation: "border-[#b58a35] bg-[#96732d] text-[#f4efe8]",
  fundamental: "border-[#a56540] bg-[#995d3a] text-[#f4efe8]",
};

export const CategoryIndicator: FC<{ value: Categories; className?: string }> = ({ value, className }) => (
  <Indicator className={`${categoryClasses[value]} ${className ?? ""}`}>{formatLabel(value)}</Indicator>
);

export const RatingIndicator: FC<{ value: number | undefined; className?: string }> = ({ value, className }) => (
  <Indicator className={`border-(--line) bg-(--surface) text-(--text-muted) ${className ?? ""}`}>{value === undefined ? "Not set" : `${value}/5`}</Indicator>
);

export const BooleanIndicator: FC<{ value: boolean; className?: string }> = ({ value, className }) => (
  <Indicator className={value ? "border-[#4e9878] bg-[#438667] text-[#f4efe8]" : `border-(--line) bg-(--surface) text-(--text-muted) ${className ?? ""}`}>
    {value ? "Yes" : "No"}
  </Indicator>
);

export const TextIndicator: FC<{ value: string; className?: string }> = ({ value, className }) => (
  <Indicator className={`border-(--line) bg-(--surface) text-(--text-muted) ${className ?? ""}`}>{formatLabel(value)}</Indicator>
);

export const NeedIndicator: FC<{ value: Meta["need"]; className?: string }> = ({ value, className }) => <RatingIndicator value={value} className={className} />;
export const MasteryIndicator: FC<{ value: Meta["mastery"]; className?: string }> = ({ value, className }) => <RatingIndicator value={value} className={className} />;
export const DifficultyIndicator: FC<{ value: Meta["difficulty"]; className?: string }> = ({ value, className }) => <RatingIndicator value={value} className={className} />;
