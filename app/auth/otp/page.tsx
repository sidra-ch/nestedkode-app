"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function OTPVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("لطفا کد 6 رقمی را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      // API call to verify OTP
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: otpCode }),
      });

      const data = await response.json();
      if (data.success) {
        // Store token and redirect
        localStorage.setItem("token", data.token);
        router.push("/profile");
      } else {
        alert(data.message || "کد وارد شده اشتباه است");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch {
      alert("خطا در تایید کد");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setTimer(120);
    // API call to resend OTP
    try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      alert("کد مجدداً ارسال شد");
    } catch {
      alert("خطا در ارسال مجدد کد");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/20">
              <svg className="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">تایید شماره موبایل</h1>
            <p className="mt-2 text-sm text-gray-600">
              کد تایید به شماره <span className="font-semibold text-gray-900">{phone}</span> ارسال شد
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-12 rounded-lg border-2 border-gray-300 text-center text-xl font-bold focus:border-orange-500 focus:outline-none"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center text-sm text-gray-600">
              {timer > 0 ? (
                <span>زمان باقی‌مانده: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</span>
              ) : (
                <button
                  onClick={resendOTP}
                  className="font-semibold text-orange-500 hover:text-orange-600"
                >
                  ارسال مجدد کد
                </button>
              )}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال تایید..." : "تایید و ورود"}
          </button>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              تغییر شماره موبایل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OTPVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerificationContent />
    </Suspense>
  );
}
