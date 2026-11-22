export type Theme = "light" | "dark";

export interface LightboxImage {
  src: string;
  alt: string;
  index: number;
  id: string;
}

export type Move = {
  name: string;
  meta: Meta;
  gif: string[];
  text: string;
};

export type Meta = {
  status: Statuses;
  family: [Family];
  category: Categories;
  need: number;
  difficulty: number;
  ingest: boolean;
  propType: string;
  where: string;
  id: string;
};

type Statuses = "Next" | "Learning" | "Training" | "Learned";

export type Categories = "Transfer" | "Combo" | "Move" | "Foundation" | "Fundamental";

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
