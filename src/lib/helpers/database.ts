import type { Move, Meta } from "@/lib/types";
import { getMarkdownMeta, getUniqueMetadataProperties, parseMetaData } from "./metaData";

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
    const mediaCandidates = [`/src/Staff Database/${imagePath}`, `/src/Staff Database/${folder ? `${folder}/` : ""}${imagePath}`];
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

export const staffDatabase: Move[] = Object.entries(markdownFiles).map(([path, markdown]) => {
  const metadata = getMarkdownMeta(markdown);
  const meta = parseMetaData(metadata);

  return {
    name: getMarkdownName(markdown, getFileName(getRelativePath(path))),
    meta,
    gif: getMediaUrls(markdown, path),
    text: getText(markdown),
  };
});

export const staffDatabaseMetadata = getUniqueMetadataProperties(staffDatabase);

export const getStaffDatabase = () => {
  return staffDatabase;
};
