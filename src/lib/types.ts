export type Theme = "light" | "dark";

export type Family =
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
  family: [Family];
  category: Category;
  need: number;
  difficulty: number;
  ingest: boolean;
  propType: string;
  where: string;
  id: string;
};

export type Move = {
  name: string;
  meta: Meta;
  gif: string[];
  text: string;
};

type Statuses = "Next" | "Learning" | "Training" | "Learned";
