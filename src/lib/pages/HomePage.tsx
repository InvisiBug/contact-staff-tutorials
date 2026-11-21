import { Link } from "react-router-dom";
import { HeroRotator, FullPictureCard, AboutMeCard, ErrorPage } from "@/lib/components";
import { categoryMeta, siteConfig, workExperienceImageSrc, workExperienceSummary } from "@/data";
import { getFeaturedProjects, getRandomProjectsByCategory } from "@/lib/helpers";
import type { CategoryKey } from "@/lib/types";
import { useMemo } from "react";

const HomePage = () => {
  return (
    <div className="grid gap-6">
      <h1>Soon to be contact staff database</h1>
    </div>
  );
};

export default HomePage;
