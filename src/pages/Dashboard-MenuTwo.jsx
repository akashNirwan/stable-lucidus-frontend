import CareerCard from "../components/dashboard/CareerCard.jsx";
import { Careers } from "../assets/carrerCard.jsx";
const DashBoardMenuTwo = () => {
  return (
    <div className="p-4 max-w-[375px] md:max-w-[1024px] mx-auto">
      <h3 className="text-[#A187FF] text-[28px]">Explore Careers</h3>
      <p className="text-[#EFEAFF] leading-[150%] mb-2">
        Try micro-experiences to unlock more{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Careers.map((career, index) => (
          <CareerCard
            key={index}
            title={career.title}
            tags={career.tags}
            description={career.description}
            image={career.image}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoardMenuTwo;
