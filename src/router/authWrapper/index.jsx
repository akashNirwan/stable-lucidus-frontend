import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="h-[100dvh] relative overflow-hidden ">
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(69.2% 73.84% at 47.36% 37.56%, #130934 0%, #261172 24.86%, #130934 70.19%)",
        }}
      />
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
        <div className="mb-12">
          <img
            src="/assets/logo.svg"
            alt="Lucidus Logo"
            width={235}
            height={44}
          />
        </div>

        <div>
          <img
            src="/assets/astronaut-login.svg"
            alt="Astronaut"
            width={270}
            height={300}
          />
        </div>
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
                <stop offset="0.206731" stop-color="#C2B1FF" />
                <stop offset="0.519231" stop-color="#7B56FF" />
                <stop offset="0.9375" stop-color="#4823CF" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <Suspense fallback={<p>Loading form...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
