import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
const toast = ({ title, description }) => {
  alert(`${title}\n${description}`);
};

export default function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const verifyOtp = "111111";

  const RESEND_KEY = "otpResendExpiry";
  const RESEND_DURATION = 30; // seconds

  const [timer, setTimer] = useState(RESEND_DURATION);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  // Load resend state
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
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast({ title: "Error", description: "Please enter a 6-digit OTP" });
      return;
    }

    if (enteredOtp === verifyOtp) {
      toast({
        title: "OTP Verified",
        description: `Entered OTP: ${enteredOtp}`,
      });

      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
    } else {
      toast({
        title: "Invalid OTP",
        description: `Entered OTP: ${enteredOtp}`,
      });
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    toast({ title: "OTP Sent", description: "A new OTP has been sent!" });

    const expiryTime = Date.now() + RESEND_DURATION * 1000;
    localStorage.setItem(RESEND_KEY, expiryTime.toString());

    setTimer(RESEND_DURATION);
    setCanResend(false);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[360px] flex flex-col items-center gap-4 p-6"
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
          onClick={() => {
            localStorage.removeItem(RESEND_KEY);
            setTimer(0);
            setCanResend(true);
            navigate("/auth/login");
          }}
        >
          ← Back
        </button>
      </div>

      <h2 className="text-center text-[20px] font-bold text-[#7B56FF]">
        Hello, username
      </h2>
      <h2 className="text-center text-[20px] font-semibold">
        OTP Verification
      </h2>
      <p className="text-center leading-[150%]">
        Enter the 6-digit OTP sent to your registered email.
      </p>

      <div className="flex justify-center gap-2 my-6">
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
            className={`w-full max-w-10 h-12 text-center text-[#7B56FF] text-lg font-semibold rounded-full border transition-all duration-200 ${
              digit
                ? "border-[#7B56FF] shadow-md shadow-[#7B56FF]/40 bg-[#EFEAFF]"
                : "border-gray-300 bg-gray-50"
            } focus:outline-none focus:border-[#40279c'] focus:ring-[#7B56FF]/60 focus:shadow-md focus:shadow-[#7B56FF]/40`}
          />
        ))}
      </div>

      <p
        onClick={handleResend}
        className={`text-center cursor-pointer hover:underline ${
          canResend ? "text-red-500" : "text-gray-400 cursor-not-allowed"
        }`}
      >
        {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
      </p>

      <Button type="submit" isActive={otp.join("").length === 6}>
        Verify OTP
      </Button>
    </motion.form>
  );
}
