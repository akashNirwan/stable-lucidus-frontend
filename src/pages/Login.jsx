import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../redux/actions/auth-action";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema, signupSchema } from "../validation/auth-validaion";
import { getDeviceInfo } from "../utils/deviceInfo";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const { loginLoading, loginerror } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const recaptcha_token = import.meta.env.VITE_reCAPTCHA_KEY;

  console.log(recaptcha_token, "recaptcha_token");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const executeRecaptcha = async () => {
    return new Promise((resolve, reject) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(recaptcha_token, { action: "submit" })
            .then((token) => resolve(token))
            .catch((err) => reject(err));
        });
      } else {
        reject("reCAPTCHA not ready");
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const { deviceId, deviceName } = getDeviceInfo();
        const token = await executeRecaptcha();

        await dispatch(
          loginUser({
            email: data.email,
            deviceId,
            deviceName,
            recaptchaToken: token,
          })
        ).unwrap();

        toast.success(`OTP sent to ${data.email}`);
        navigate("/auth/otp");
      } else {
        await dispatch(
          signupUser({
            email: data.email,
            name: data.username,
          })
        ).unwrap();

        localStorage.setItem("email", data.email);
        navigate("/auth/otp");
      }
    } catch (err) {
      console.error("Auth failed:", err);
      toast.error(err || "Something went wrong");
    }
  };

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptcha_token}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [recaptcha_token]);
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
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 h-12 rounded-full cursor-pointer flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            isLogin ? "bg-[#4823CF] text-white shadow" : "text-[#4823CF]"
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 h-12 rounded-full cursor-pointer flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            !isLogin ? "bg-[#4823CF] text-white shadow" : "text-[#4823CF]"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className={`w-full space-y-4 ${isLogin ? "my-6" : "-my-2"} `}>
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
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
                  }}
                  minLength={2}
                  maxLength={50}
                   disabled={loginLoading}
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
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(
                      /[^a-zA-Z0-9@.]/g,
                      ""
                    );
                  }}
                  minLength={2}
                  maxLength={100}
                  placeholder="Enter Your School Email"
                   disabled={loginLoading}
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
                onInput={(e) => {
                  e.target.value = e.target.value.replace(
                    /[^a-zA-Z0-9@.]/g,
                    ""
                  );
                }}
                minLength={2}
                  maxLength={100}
                type="email"
                placeholder="Enter Your School Email"
                disabled={loginLoading}
                error={errors.email}
              />
            )}
          />
        )}
      </div>

      {/* Submit Button */}

      <Button type="submit" disabled={loginLoading || !isValid} >
        {/* {isLogin ? "Send OTP" : "Create Account"} */}
        {loginLoading ? <LoadingSpinner size={20}></LoadingSpinner>: (isLogin ? "Send OTP" : "Create Account")}
      </Button>
    </motion.form>
  );
}
