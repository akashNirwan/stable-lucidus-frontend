export default function Button({
  children,
  type = "button",
  disabled = false,
  isActive = true,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled || !isActive}
      onClick={onClick}
      className={`w-full rounded-[12px] font-semibold cursor-pointer text-base py-4 shadow transition-all
        ${
          isActive && !disabled
            ? "bg-[#0F8864] text-white hover:scale-[1.02] active:scale-[0.98]"
            : "bg-[#0F8864]/[0.8] text-white cursor-not-allowed"
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
