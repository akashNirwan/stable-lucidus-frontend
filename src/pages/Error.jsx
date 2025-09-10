import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
export default function Error() {
  const navigate = useNavigate()
  const handleDashboard = () =>{
    navigate(`/dashboard`)
  }
  return (
    <div className="h-screen relative overflow-hidden z-10">
      {/* Background */}
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(69.2% 73.84% at 47.36% 37.56%, #130934 70.19%)",
        }}
      />

      {/* Robot */}
      <div className="absolute top-[20%] right-0">
        <img src="/assets/error.svg" alt="robot" />
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 w-[20px] h-[24px]">
        <img src="/assets/header_logo.svg" alt="logo" className="size-full" />
      </div>

      {/* Stars & sparkles */}
      <div className="fixed inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`plus-${i}`}
            className="absolute text-white text-xs opacity-80 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start h-screen px-4 pt-12">
        <div className="absolute top-30 left-4">
          <img src="/assets/blue-planet.svg" alt="road-map" />
        </div>
        <div className="absolute top-[320px] right-6">
          <img src="/assets/yellow-planet.svg" alt="road-map" />
        </div>
        <div className="absolute top-[110px] left-28">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <circle
              cx="4.5"
              cy="4.5"
              r="4.5"
              fill="url(#paint0_radial_1_118)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_1_118"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(1.62 1.26) rotate(46.7357) scale(8.40428)"
              >
                <stop offset="0.206731" stopColor="#C2B1FF" />
                <stop offset="0.519231" stopColor="#7B56FF" />
                <stop offset="0.9375" stopColor="#4823CF" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 404 Message - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[90px] font-bold text-[#FF9A64]">404</p>
        <p className="text-white text-[24px] font-bold]">
          Oops!
          <br />
          You seem to be lost...
        </p>
      </div>

      {/* Button - Centered at Bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <Button onClick={handleDashboard} className="px-4">Go to Dashboard</Button>
      </div>
    </div>
  );
}
