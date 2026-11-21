import { Link } from "react-router-dom";
import { HeroRotator, FullPictureCard, AboutMeCard, ErrorPage } from "@/lib/components";
import { categoryMeta, siteConfig, workExperienceImageSrc, workExperienceSummary } from "@/data";
import { getFeaturedProjects, getRandomProjectsByCategory } from "@/lib/helpers";
import type { CategoryKey } from "@/lib/types";
import { useMemo } from "react";
import { useMovesContext } from "../context";

const HomePage = () => {
  const { staffDatabase } = useMovesContext();
  console.log("🚀 ~ HomePage ~ staffDatabase:", staffDatabase);
  return (
    <div className="grid gap-6">
      {staffDatabase.map((move) => {
        return <div>{move.name}</div>;
      })}
    </div>
  );
};

export default HomePage;
