import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    alert(
      isLogin
        ? `OTP Sent Successfully to ${data.email}`
        : `Account Created for ${data.username || data.email}`
    );
    navigate("/auth/otp");
  };

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[360px] flex flex-col items-center gap-5 p-6"
      style={{
        borderRadius: "24px 24px 0 0",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -5.54%, #FFF 50%)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Toggle Buttons */}
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            isLogin ? "bg-[#4823CF] text-white shadow" : "text-[#4823CF]"
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            !isLogin ? "bg-[#4823CF] text-white shadow" : "text-[#4823CF]"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="w-full space-y-4 my-6">
        {!isLogin ? (
          <>
            <TextInput
              type="text"
              placeholder="Enter Your User Name"
              register={register("username", {
                required: "Username is required",
              })}
              error={errors.username}
            />

            <TextInput
              type="email"
              placeholder="Enter Your School Email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.email}
            />
          </>
        ) : (
          <TextInput
            type="email"
            placeholder="Enter Your School Email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            error={errors.email}
          />
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" isActive={isValid}>
        {isLogin ? "Send OTP" : "Create Account"}
      </Button>
    </motion.form>
  );
}
