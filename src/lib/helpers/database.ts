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

const getMarkdownMeta = (markdown: string): Meta => {
  const properties = {} as Meta;
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

    console.log("🚀 ~ getMarkdownMeta ~ properties:", properties);
    return properties;
  }
  return properties;
};

const countRating = (value: string | undefined, character: string): Meta["need"] => {
  const numericValue = Number(value);
  const count = Number.isFinite(numericValue) ? numericValue : (value?.match(new RegExp(`\\${character}`, "g"))?.length ?? 1);
  return Math.min(5, Math.max(1, count)) as Meta["need"];
};

export const staffDatabase: Move[] = Object.entries(markdownFiles).map(([path, markdown]) => {
  const metadata = getMarkdownMeta(markdown);

  return {
    name: getMarkdownName(markdown, getFileName(getRelativePath(path))),
    // meta: getMeta(metadata),
    meta: metadata,
    gif: getMediaUrls(markdown, path),
    text: getText(markdown),
  };
});

export const getStaffDatabase = () => {
  return staffDatabase;
};
