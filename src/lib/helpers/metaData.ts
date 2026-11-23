import type { Meta, Move, Family, Categories, Statuses } from "@/lib/types";

export type RawMetadata = Record<string, string[]>;

export const getMarkdownMeta = (markdown: string): RawMetadata => {
  const properties: RawMetadata = {};
  const lines = markdown.split(/\r?\n/);

  const frontmatterStart = lines.indexOf("---");

  if (frontmatterStart !== -1) {
    for (const line of lines.slice(frontmatterStart + 1)) {
      if (line.trim() === "---") {
        break;
      }

      const property = line.match(/^([^:]+):\s*(.*)$/);
      if (property) {
        const key = property[1].trim().toLowerCase();
        const value = property[2].trim().toLowerCase();
        const values = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        properties[key] = values.length > 1 ? values : [value];
      }
    }

    return properties;
  }
  return properties;
};

const countRating = (value: string | undefined, character: string): Meta["need"] => {
  const numericValue = Number(value);
  const count = Number.isFinite(numericValue) ? numericValue : (value?.match(new RegExp(`\\${character}`, "g"))?.length ?? 1);
  return Math.min(5, Math.max(1, count)) as Meta["need"];
};

type RawMetadataValue<Property extends keyof Meta> = Property extends "need" | "difficulty" | "ingest" ? string : Meta[Property];

export const getMetadataValue = <Property extends keyof Meta>(metadata: RawMetadata, property: Property, ...aliases: string[]): RawMetadataValue<Property> | undefined => {
  for (const key of [property, ...aliases]) {
    const value = metadata[key]?.[0];
    if (value) {
      return value as RawMetadataValue<Property>;
    }
  }

  return undefined;
};

// TODO: Need to fix types like difficulty being a number and not an actual type
export const parseMetaData = (metadata: RawMetadata): Meta => {
  const family = (getMetadataValue(metadata, "family") ?? "") as Family;
  const category = (getMetadataValue(metadata, "category") ?? "") as Categories;
  const status = (getMetadataValue(metadata, "status") ?? "") as Statuses;
  const need = countRating(getMetadataValue(metadata, "need", "how badly do i need it"), "*");
  const difficulty = countRating(getMetadataValue(metadata, "difficulty"), "*");
  const ingest = getMetadataValue(metadata, "ingest");
  const propType = getMetadataValue(metadata, "propType", "proptype", "prop type", "staff type");
  const where = getMetadataValue(metadata, "where", "where was it first learned");
  const id = getMetadataValue(metadata, "id");

  return {
    status,
    family: [family],
    category,
    need,
    difficulty,
    ingest: ingest === "yes" || ingest === "true",
    propType: propType ?? "",
    where: where ?? "",
    id: id ?? "",
  };
};
export type UniqueMetadata = Record<string, string[]>;

export const getMetadataValues = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : [String(value)]);

export const getUniqueMetadataProperties = (moves: Move[]): UniqueMetadata =>
  moves.reduce<UniqueMetadata>((properties, move) => {
    Object.entries(move.meta).forEach(([property, value]) => {
      properties[property] = [...new Set([...(properties[property] ?? []), ...getMetadataValues(value)])].sort();
    });

    return properties;
  }, {});
