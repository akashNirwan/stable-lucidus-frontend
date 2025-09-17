// import React from "react";

// export default function LoadingSpinner({
//   variant = "ring", // "ring" | "dots"
//   size = 48,
//   label = "Loading",
//   fullscreen = false,
//   className = "",
// }) {
//   const content =
//     variant === "dots" ? (
//       <div
//         className="flex items-center justify-center gap-1"
//         role="status"
//         aria-live="polite"
//         aria-label={label}
//       >
//         <span className="dot w-2 h-2 rounded-full bg-current" />
//         <span className="dot w-2 h-2 rounded-full bg-current animation-delay-150" />
//         <span className="dot w-2 h-2 rounded-full bg-current animation-delay-300" />
//       </div>
//     ) : (
//       <svg
//         className="animate-spin"
//         width={size}
//         height={size}
//         viewBox="0 0 24 24"
//         role="status"
//         aria-live="polite"
//         aria-label={label}
//       >
//         {/* Track */}
//         <circle
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeOpacity="0.2"
//           strokeWidth="4"
//           fill="none"
//         />
//         {/* Arc */}
//         <path
//           d="M22 12a10 10 0 0 1-10 10"
//           stroke="currentColor"
//           strokeWidth="4"
//           strokeLinecap="round"
//           fill="none"
//         />
//       </svg>
//     );

//   return (
//     <>
//       {/* Minimal CSS for the dots variant + utilities */}
//       <style>{`
//         @keyframes pulseUp {
//           0%, 80%, 100% { transform: translateY(0); opacity: .5; }
//           40% { transform: translateY(-35%); opacity: 1; }
//         }
//         .dot { animation: pulseUp 1s infinite ease-in-out; }
//         .animation-delay-150 { animation-delay: .15s; }
//         .animation-delay-300 { animation-delay: .3s; }
//         /* Fallback for animate-spin if Tailwind not present */
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .animate-spin { animation: spin 1s linear infinite; }
//       `}</style>

//       {fullscreen ? (
//         <div
//           className={`fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm ${className}`}
//         >
//           <div
//             className="text-indigo-600"
//             style={{ width: size, height: size, fontSize: 0 }}
//           >
//             {content}
//           </div>
//           <span className="sr-only">{label}</span>
//         </div>
//       ) : (
//         <div
//           className={`inline-flex items-center justify-center text-indigo-600 ${className}`}
//           style={{ width: size, height: size, fontSize: 0 }}
//         >
//           {content}
//           <span className="sr-only">{label}</span>
//         </div>
//       )}
//     </>
//   );
// }



import React from "react";

export default function LoadingSpinner({
  variant = "ring", // "ring" | "dots" | "pulse" | "bars"
  size = 48,
  color = "purple", // "blue" | "purple" | "pink" | "green" | "orange" | "red" | "gray"
  label = "Loading",
  fullscreen = false,
  className = "",
}) {
  // Color variants with modern gradients
  const colorClasses = {
    blue: "text-blue-600 from-blue-400 to-blue-600",
    purple: "text-purple-600 from-purple-400 to-purple-600", 
    pink: "text-pink-600 from-pink-400 to-pink-600",
    green: "text-green-900 from-green-500 to-green-900",
    orange: "text-orange-600 from-orange-400 to-orange-600",
    red: "text-red-600 from-red-400 to-red-600",
    gray: "text-gray-600 from-gray-400 to-gray-600"
  };

  const colorClass = colorClasses[color] || colorClasses.blue;

  const getContent = () => {
    switch (variant) {
      case "dots":
        return (
          <div
            className="flex items-center justify-center gap-1.5"
            role="status"
            aria-live="polite"
            aria-label={label}
          >
            <span className="dot w-3 h-3 rounded-full bg-gradient-to-r shadow-lg" style={{background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`}} />
            <span className="dot w-3 h-3 rounded-full bg-gradient-to-r shadow-lg animation-delay-150" style={{background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`}} />
            <span className="dot w-3 h-3 rounded-full bg-gradient-to-r shadow-lg animation-delay-300" style={{background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`}} />
          </div>
        );
      
      case "pulse":
        return (
          <div
            className={`pulse-ring bg-gradient-to-r ${colorClass} rounded-full shadow-2xl`}
            role="status"
            aria-live="polite"
            aria-label={label}
            style={{ width: size * 0.6, height: size * 0.6 }}
          />
        );

      case "bars":
        return (
          <div
            className="flex items-end justify-center gap-1"
            role="status"
            aria-live="polite"
            aria-label={label}
          >
            <span className="bar w-1.5 bg-gradient-to-t rounded-full shadow-md" style={{background: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`, height: size * 0.4}} />
            <span className="bar w-1.5 bg-gradient-to-t rounded-full shadow-md animation-delay-150" style={{background: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`, height: size * 0.6}} />
            <span className="bar w-1.5 bg-gradient-to-t rounded-full shadow-md animation-delay-300" style={{background: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`, height: size * 0.5}} />
            <span className="bar w-1.5 bg-gradient-to-t rounded-full shadow-md animation-delay-450" style={{background: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`, height: size * 0.7}} />
            <span className="bar w-1.5 bg-gradient-to-t rounded-full shadow-md animation-delay-600" style={{background: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`, height: size * 0.4}} />
          </div>
        );

      default: // "ring"
        return (
          <div className="relative">
            <svg
              className="animate-spin drop-shadow-lg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              role="status"
              aria-live="polite"
              aria-label={label}
            >
              {/* Background track */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="3"
                fill="none"
              />
              {/* Animated arc with gradient */}
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke={`url(#gradient-${color})`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Center glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-md opacity-20 bg-gradient-to-r animate-pulse"
              style={{ 
                background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                transform: 'scale(0.6)'
              }}
            />
          </div>
        );
    }
  };

  return (
    <>
      {/* Modern CSS animations */}
      <style>{`
        :root {
          --tw-gradient-from: ${color === 'blue' ? '#60a5fa' : 
                              color === 'purple' ? '#a78bfa' :
                              color === 'pink' ? '#f472b6' :
                              color === 'green' ? '#4ade80' :
                              color === 'orange' ? '#fb923c' :
                              color === 'red' ? '#f87171' : '#9ca3af'};
          --tw-gradient-to: ${color === 'blue' ? '#2563eb' :
                            color === 'purple' ? '#7c3aed' :
                            color === 'pink' ? '#ec4899' :
                            color === 'green' ? '#16a34a' :
                            color === 'orange' ? '#ea580c' :
                            color === 'red' ? '#dc2626' : '#6b7280'};
        }

        @keyframes bounceUp {
          0%, 80%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.7; 
          }
          40% { 
            transform: translateY(-50%) scale(1.1); 
            opacity: 1; 
          }
        }
        
        @keyframes pulseRing {
          0% { 
            transform: scale(0.8); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1.4); 
            opacity: 0; 
          }
        }
        
        @keyframes barStretch {
          0%, 40%, 100% { 
            transform: scaleY(0.4); 
          }
          20% { 
            transform: scaleY(1); 
          }
        }

        .dot { 
          animation: bounceUp 1.4s infinite ease-in-out; 
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .pulse-ring { 
          animation: pulseRing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1); 
        }
        
        .bar { 
          animation: barStretch 1.2s infinite ease-in-out; 
          transform-origin: bottom;
        }

        .animation-delay-150 { animation-delay: 0.15s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-450 { animation-delay: 0.45s; }
        .animation-delay-600 { animation-delay: 0.6s; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }

        /* Glass morphism effect for fullscreen */
        .glass-bg {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {fullscreen ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md ${className}`}
        >
          <div className="glass-bg p-8 rounded-2xl shadow-2xl">
            <div
              className={`${colorClass} flex flex-col items-center gap-4`}
              style={{ fontSize: 0 }}
            >
              {getContent()}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                {label}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`inline-flex items-center justify-center ${colorClass} ${className}`}
          style={{ width: size, height: size, fontSize: 0 }}
        >
          {getContent()}
          <span className="sr-only">{label}</span>
        </div>
      )}
    </>
  );
}