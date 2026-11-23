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
  userData?: Partial<Omit<Meta, "id">>;
  gif: string[];
  text: string;
};

export type Meta = {
  status: Statuses;
  family: [Family];
  category: Categories;
  need: number;
  mastery?: number;
  difficulty: number;
  ingest: boolean;
  propType: string;
  where: string;
  id: string;
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Ingest = boolean;
export type Statuses = "next" | "learning" | "training" | "learned";

export type Categories = "transfer" | "combo" | "move" | "foundation" | "fundamental";

export type Family =
  | "acro"
  | "angel"
  | "arms"
  | "body roll"
  | "chi folds"
  | "conveyor"
  | "elbow"
  | "fishtail"
  | "geometric patterns"
  | "halo"
  | "isolations"
  | "journey"
  | "linears"
  | "lucero"
  | "matrix"
  | "neck"
  | "other"
  | "shoulder"
  | "snes"
  | "stalls"
  | "steve"
  | "tiptail"
  | "weaves";

type staffTypes = "contact" | "doubles" | "dragon";

type test = {
  status: ["cool stuff", "learned", "learning", "next", "training", "up next"];
  family: Family;
  need: Rating;
  difficulty: Rating;
  mastery: Rating;
  ingest: boolean;
  proptype: ["contact", "doubles"];
  id: string;
  category: ["combo", "foundation", "fundamental", "move", "transfer"];
  "how badly do i need it": Rating;
  "needs media": string;
  "drill reps": string;
  "staff type": staffTypes;
  "where was it first learned": ["ejc 2024", "ejc 2025", "insta", "la papet 2024", "la papet 2025", "london jordan trip", "mcp", "play 2024", "random playing about", "slackfest 2023", "summer tour 2026", "youtube"];
  date: ["2023", "2025", "2026", "august 16", "august 17", "august 18", "august 31", "august 8", "february 16", "july 22", "may 11", "may 19", "september 24"];
  "extra notes": string;
  "improvement notes": string;
  me: ["me"];
  unlocks: [
    "chest spins (chest%20spins%2059c85424b5dd4afd8f1a1ab9a773ebfc.md)",
    "chi fold with lotus conveyor (chi%20fold%20with%20lotus%20conveyor%203cd6b010191f809f9758f89534e3e630.md)",
    "forward fishtail to halo (forward%20fishtail%20to%20halo%207decd1084b374da0b6627aa93ae37cfa.md)",
    "forward fishtails (forward%20fishtails%205453ad847ea2448983bc5992db20a500.md)",
    "lotus conveyor (lotus%20conveyor%203e56b010191f800bb7aff2ce6260cb4e.md)",
    "neckwrap 360 (neckwrap%20360%200cb274150754456a89ebe2c04abac939.md)",
    "throat wrap (throat%20wrap%2057c89f1f2ad64882b611d87a7c995a6d.md)",
  ];
};
