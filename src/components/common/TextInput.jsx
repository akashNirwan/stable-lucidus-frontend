export default function TextInput(
  {
    type = "text",
    placeholder,
    error,
    value,
    onChange,
    onBlur,
    minLength,
    maxLength,
    onInput,
    disabled,
    name,
  },
  ref
) {
  return (
    <div>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        onInput={onInput}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        className="w-full h-12 placeholder:text-[#7B56FF] rounded-full border border-[#7B56FF] bg-[#EFEAFF] px-6  text-[rgba(123,86,255,1)] outline-none focus:placeholder-transparent"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">{error.message}</p>
      )}
    </div>
  );
}
