import PathCrousel from "../components/encylopedia/PathCrousel";
import CareerCard from "../components/dashboard/microExperienceCard";
import RelatedCareerCard from "../components/dashboard/RelatedCareerCard";
const Process = () => {
  return (
    <div className="text-white">
      <PathCrousel />
      <h2>Related Career Path</h2>
      <div className="flex gap-2 overflow-x-auto w-full max-w-[355px]">
        <div className="shrink-0">
          <RelatedCareerCard />
        </div>
        <div className="shrink-0">
          <RelatedCareerCard />
        </div>
        <div className="shrink-0">
          <RelatedCareerCard />
        </div>
        <div className="shrink-0">
          <RelatedCareerCard />
        </div>
      </div>
    </div>
  );
};

export default Process;
