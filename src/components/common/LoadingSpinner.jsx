// LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({
  variant = "ring", // "ring" | "dots"
  size = 48,
  label = "Loading",
  fullscreen = false,
  className = "",
}) {
  const content =
    variant === "dots" ? (
      <div
        className="flex items-center justify-center gap-1"
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        <span className="dot w-2 h-2 rounded-full bg-current" />
        <span className="dot w-2 h-2 rounded-full bg-current animation-delay-150" />
        <span className="dot w-2 h-2 rounded-full bg-current animation-delay-300" />
      </div>
    ) : (
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        {/* Track */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="4"
          fill="none"
        />
        {/* Arc */}
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );

  return (
    <>
      {/* Minimal CSS for the dots variant + utilities */}
      <style>{`
        @keyframes pulseUp {
          0%, 80%, 100% { transform: translateY(0); opacity: .5; }
          40% { transform: translateY(-35%); opacity: 1; }
        }
        .dot { animation: pulseUp 1s infinite ease-in-out; }
        .animation-delay-150 { animation-delay: .15s; }
        .animation-delay-300 { animation-delay: .3s; }
        /* Fallback for animate-spin if Tailwind not present */
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>

      {fullscreen ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm ${className}`}
        >
          <div
            className="text-indigo-600"
            style={{ width: size, height: size, fontSize: 0 }}
          >
            {content}
          </div>
          <span className="sr-only">{label}</span>
        </div>
      ) : (
        <div
          className={`inline-flex items-center justify-center text-indigo-600 ${className}`}
          style={{ width: size, height: size, fontSize: 0 }}
        >
          {content}
          <span className="sr-only">{label}</span>
        </div>
      )}
    </>
  );
}