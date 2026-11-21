export type Theme = "light" | "dark";

export type Families =
  | "Acro"
  | "Angel"
  | "Arms"
  | "Body Roll"
  | "Chi Folds"
  | "Conveyor"
  | "Elbow"
  | "Fishtail"
  | "Geometric Patterns"
  | "Halo"
  | "Isolations"
  | "Journey"
  | "Linears"
  | "Lucero"
  | "Matrix"
  | "Neck"
  | "Other"
  | "Shoulder"
  | "SNES"
  | "Stalls"
  | "Steve"
  | "Tiptail"
  | "Weaves";

export type Category = "Transfer" | "Combo" | "Move" | "Foundation" | "Fundamental";

export interface LightboxImage {
  src: string;
  alt: string;
  index: number;
  id: string;
}

export type Meta = {
  status: Statuses;
  id: string;
  family: Families;
  category: Category;
  need: Rating;
  difficulty: Rating;
  ingest: boolean;
  propType: PropType;
  where: string;
};

export type Move = {
  name: string;
  id: string;
  meta: Meta;
  gif: string[];
  text: string;
};

type metaProperties = "Name" | "Status" | "Family" | "Category" | "Need" | "Difficulty" | "Ingest" | "Type" | "Where";

export type Statuses = "Next" | "Learning" | "Training" | "Learned";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type PropType = "Contact" | "Doubles";
