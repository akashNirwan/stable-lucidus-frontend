export default function TextInput({
  type = "text",
  placeholder,
  register,
  error,
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full h-12 placeholder:text-[#7B56FF] rounded-full border border-[#7B56FF] bg-[#EFEAFF] px-6 text-center text-[rgba(123,86,255,1)] outline-none"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">{error.message}</p>
      )}
    </div>
  );
}
