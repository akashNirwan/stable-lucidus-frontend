import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../redux/actions/auth-action";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { otpSchema } from "../validation/auth-validaion";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    verifyOtpLoading,
    verifyOtpError,
    resendOtpLoading,
    resendOtpError,
    user,
    otpRequestId,
  } = useSelector((state) => state.auth);



  const useremail = localStorage.getItem("email");

 

  const RESEND_KEY = "otpResendExpiry";
  const RESEND_DURATION = 30; // seconds

  const [timer, setTimer] = useState(RESEND_DURATION);
  const [canResend, setCanResend] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const expiry = localStorage.getItem(RESEND_KEY);
    let remaining = RESEND_DURATION;
    if (expiry) {
      remaining = Math.floor((Number(expiry) - Date.now()) / 1000);
      if (remaining <= 0) {
        remaining = RESEND_DURATION;
        setCanResend(true);
      } else {
        setCanResend(false);
      }
    } else {
      const newExpiry = Date.now() + RESEND_DURATION * 1000;
      localStorage.setItem(RESEND_KEY, newExpiry.toString());
      setCanResend(false);
    }
    setTimer(remaining);
  }, []);

  // Countdown
  useEffect(() => {
    if (canResend) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update form value
    const otpString = newOtp.join("");
    setValue("otp", otpString);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      otp: parseInt(data.otp),
      id: user?.id,
    };
    

    try {
      const result = await dispatch(verifyOtp(payload)).unwrap();

      if (result?.data?.[0]) {
        const userData = result.data[0];
        
        if (userData?.token) {
          localStorage.setItem("token", userData.token);
        }

        toast.success(`OTP Verified Welcome ${userData.name} `);
        localStorage.removeItem("email");
        localStorage.removeItem("deviceId");
        navigate("/welcome");
      }
    } catch (error) {
      

      setOtp(Array(6).fill(""));
      reset();
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || resendOtpLoading) return;

    const payload = {
      email: user?.email || useremail,
    };

    try {
      await dispatch(resendOtp(payload)).unwrap();

      const expiryTime = Date.now() + RESEND_DURATION * 1000;
      localStorage.setItem(RESEND_KEY, expiryTime.toString());

      setTimer(RESEND_DURATION);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      reset();
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Resend otp failed");
    }
  };

  const handleBack = () => {
    localStorage.removeItem(RESEND_KEY);
    localStorage.removeItem("email");
    setTimer(0);
    setCanResend(true);
    navigate("/auth/login");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[400px] flex flex-col items-center gap-1 p-6"
      style={{
        borderRadius: "24px 24px 0 0",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.8) -5.54%, #FFF 50%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={handleBack}
          disabled={verifyOtpLoading}
          className="text-[#24A57F] font-bold"
        >
          <ArrowLeft className="font-bold" />
        </button>
      </div>

      <h2 className="text-center text-[20px] font-bold text-[#7B56FF]">
        Hello, {user?.name || "username"}
      </h2>
      <h2 className="text-center text-[20px] font-semibold">
        OTP Verification
      </h2>

      <div className="flex justify-center gap-2 my-2">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  disabled={verifyOtpLoading}
                  className={`w-full max-w-10 h-12 text-center text-[#7B56FF] text-lg font-semibold rounded-full border transition-all duration-200 ${
                    digit
                      ? "border-[#7B56FF] shadow-md shadow-[#7B56FF]/40 bg-[#EFEAFF]"
                      : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:border-[#40279c] focus:ring-[#7B56FF]/60 focus:shadow-md focus:shadow-[#7B56FF]/40 ${
                    verifyOtpLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              ))}
            </>
          )}
        />
      </div>

      {errors.otp && (
        <p className="text-red-500 text-sm text-center">{errors.otp.message}</p>
      )}

      {verifyOtpError && (
        <p className="text-red-500 text-sm text-center">{verifyOtpError}</p>
      )}

      <p
        onClick={handleResend}
        className={`text-center cursor-pointer hover:underline text-sm ${
          canResend && !resendOtpLoading
            ? "text-[#24A57F]"
            : "text-gray-400 cursor-not-allowed"
        }`}
      >
        {resendOtpLoading
          ? "Sending..."
          : canResend
          ? "Resend OTP"
          : `Resend OTP in ${timer}s`}
      </p>

      {resendOtpError && (
        <p className="text-red-500 text-sm text-center">{resendOtpError}</p>
      )}

      <Button
        type="submit"
        isActive={otp.join("").length === 6 && !verifyOtpLoading}
        disabled={verifyOtpLoading || resendOtpLoading}
      >
        {verifyOtpLoading || resendOtpLoading ? <LoadingSpinner size={20} color="green" variant="ring"></LoadingSpinner>: "Verify OTP"}
      </Button>
    </motion.form>
  );
}
