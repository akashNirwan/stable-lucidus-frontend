import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/auth-action";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema,signupSchema } from "../validation/auth-validaion";
import { getDeviceInfo } from "../utils/deviceInfo";
import toast from "react-hot-toast";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch()
   const {loginLoading, loginerror  } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const {
    
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange",
      resolver: yupResolver(isLogin ? loginSchema : signupSchema),
   });

 

  const onSubmit = async (data) => {
    console.log("hiii");
    const { deviceId, deviceName } = getDeviceInfo();
    console.log(deviceId, deviceName, "deviceid");
    
  try {
    const res = await dispatch(loginUser({
       email: data.email ,
       deviceId : deviceId,
       deviceName : deviceName,
      })).unwrap();

    toast.success(`OTP sent to ${data.email}`);
    navigate("/auth/otp");
  } catch (err) {
    console.error("Login failed:", err);
    toast.error(err || "Failed to login");
  }
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
            <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            type="text"
            placeholder="Enter Your User Name"
            error={errors.username}
          />
        )}
      />

            <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            type="email"
            placeholder="Enter Your School Email"
            error={errors.email}
          />
        )}
      />
          </>
        ) : (
          <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          type="email"
          placeholder="Enter Your School Email"
          error={errors.email}
        />
      )}
    />
  )}
      </div>

      {/* Submit Button */}
      
      
      <Button type="submit" disabled={loginLoading || !isValid}>
        {isLogin ? "Send OTP" : "Create Account"}
      </Button>
    </motion.form>
  );
}
