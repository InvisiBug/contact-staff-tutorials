import type { Move, Meta } from "@/lib/types";

const markdownFiles = import.meta.glob("/src/Staff Database/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const mediaFiles = import.meta.glob("/src/Staff Database/**/*.{gif,png}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const getRelativePath = (path: string): string => path.replace("/src/Staff Database/", "");

const getFolderPath = (relativePath: string): string => {
  const lastSlash = relativePath.lastIndexOf("/");
  return lastSlash === -1 ? "" : relativePath.slice(0, lastSlash);
};

const getFileName = (relativePath: string): string => relativePath.slice(relativePath.lastIndexOf("/") + 1);

const getMediaUrls = (markdown: string, markdownPath: string): string[] => {
  const folder = getFolderPath(getRelativePath(markdownPath));

  return [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].flatMap(([_, image]) => {
    if (/^https?:\/\//.test(image)) {
      return [image];
    }

    const imagePath = decodeURIComponent(image.split(/[?#]/, 1)[0]).replace(/^\.\//, "");
    const mediaCandidates = [
      `/src/Staff Database/${imagePath}`,
      `/src/Staff Database/${folder ? `${folder}/` : ""}${imagePath}`,
    ];
    const resolvedPath = mediaCandidates.find((path) => path in mediaFiles);

    return resolvedPath ? [mediaFiles[resolvedPath]] : [];
  });
};

const getMarkdownName = (markdown: string, fallbackName: string): string => {
  const firstLine = markdown.split(/\r?\n/, 1)[0].trim();
  return firstLine.replace(/^#\s+/, "").trim() || fallbackName;
};

const getMarkdownContent = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/);
  const frontmatterStart = lines.findIndex((line) => line.trim() === "---");

  if (frontmatterStart === -1) {
    return markdown;
  }

  const frontmatterEnd = lines.findIndex((line, index) => index > frontmatterStart && line.trim() === "---");
  return frontmatterEnd === -1
    ? markdown
    : lines
        .slice(frontmatterEnd + 1)
        .join("\n")
        .trim();
};

const getText = (markdown: string): string =>
  getMarkdownContent(markdown)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .trim();

const getMarkdownMeta = (markdown: string): Record<string, string> => {
  const properties: Record<string, string> = {};
  const lines = markdown.split(/\r?\n/);
  const frontmatterStart = lines.indexOf("---");

  if (frontmatterStart !== -1) {
    for (const line of lines.slice(frontmatterStart + 1)) {
      if (line.trim() === "---") {
        break;
      }

      const property = line.match(/^([^:]+):\s*(.*)$/);

      if (property) {
        properties[property[1].trim()] = property[2].trim();
      }
    }

    return properties;
  }

  let readingProperties = false;
  let hasReadProperty = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      readingProperties = true;
      continue;
    }

    if (!readingProperties) {
      continue;
    }

    if (!line.trim() && !hasReadProperty) {
      continue;
    }

    const property = line.match(/^([^:]+):\s*(.*)$/);

    if (!property) {
      break;
    }

    properties[property[1].trim()] = property[2].trim();
    hasReadProperty = true;
  }

  return properties;
};

const countRating = (value: string | undefined, character: string): number => (value?.split(character).length ? (value.match(new RegExp(`\\${character}`, "g"))?.length ?? 0) : 0);

const getMeta = (metadata: Record<string, string>): Meta => ({
  status: metadata.Status ?? "",
  family: metadata.Family ?? "",
  category: metadata.Category ?? "",
  need: countRating(metadata["How badly do I need it"], "⭐"),
  difficulty: countRating(metadata.Difficulty, "💀"),
  ingest: /^yes$/i.test(metadata.Ingest ?? ""),
  type: metadata["Staff Type"] ?? "",
  where: metadata["Where was it first learned"] ?? "",
});

export const staffDatabase: Move[] = Object.entries(markdownFiles).map(([path, markdown]) => {
  const metadata = getMarkdownMeta(markdown);

  return {
    name: getMarkdownName(markdown, getFileName(getRelativePath(path))),
    id: metadata.id ?? getRelativePath(path),
    meta: getMeta(metadata),
    gif: getMediaUrls(markdown, path),
    text: getText(markdown),
  };
});

export const getStaffDatabase = () => {
  return staffDatabase;
};
