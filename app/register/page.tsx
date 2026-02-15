"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";
import { Eye, EyeOff, CheckCircle2, XCircle, CheckCircle } from "lucide-react";

const validatePassword = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  return checks;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registerUserInfo, setRegisterUserInfo] = useState<{ name: string; email: string } | null>(null);
  const { register, isAuthenticated } = useAuthStore();

  const passwordValidation = validatePassword(password);
  const allPasswordChecksPassed =
    passwordValidation.length &&
    passwordValidation.uppercase &&
    passwordValidation.lowercase &&
    passwordValidation.number;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allPasswordChecksPassed) {
      setError("لطفاً تمام شرایط رمز عبور را رعایت کنید");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    setLoading(true);

    try {
      await register(name.trim(), email.trim().toLowerCase(), password, phone.trim());
      
      // Show success popup
      setRegisterUserInfo({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });
      setShowSuccessPopup(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/bus");
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "ثبت‌نام ناموفق بود");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    router.push("/bus");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">ثبت‌نام</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">نام و نام خانوادگی *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">ایمیل *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">شماره تماس (اختیاری)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">رمز عبور *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm pr-10 text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password && (
                <div className="mt-2 space-y-1 text-xs text-right">
                  <div className={passwordValidation.length ? "text-green-600" : "text-gray-500"}>
                    {passwordValidation.length ? <CheckCircle2 size={14} className="inline ml-1" /> : <XCircle size={14} className="inline ml-1" />}
                    حداقل ۸ کاراکتر
                  </div>
                  <div className={passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}>
                    {passwordValidation.uppercase ? <CheckCircle2 size={14} className="inline ml-1" /> : <XCircle size={14} className="inline ml-1" />}
                    یک حرف بزرگ
                  </div>
                  <div className={passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}>
                    {passwordValidation.lowercase ? <CheckCircle2 size={14} className="inline ml-1" /> : <XCircle size={14} className="inline ml-1" />}
                    یک حرف کوچک
                  </div>
                  <div className={passwordValidation.number ? "text-green-600" : "text-gray-500"}>
                    {passwordValidation.number ? <CheckCircle2 size={14} className="inline ml-1" /> : <XCircle size={14} className="inline ml-1" />}
                    یک عدد
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">تکرار رمز عبور *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm pr-10 text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600 text-right">رمز عبور و تکرار آن یکسان نیستند</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !allPasswordChecksPassed}
              className="w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-orange-600 font-semibold hover:underline">
              ورود
            </Link>
          </p>
        </div>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && registerUserInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ثبت‌نام با موفقیت انجام شد!
              </h2>
              
              <p className="text-gray-600 mb-4">
                به افغانی‌بابا خوش آمدید، <span className="font-semibold text-gray-900">{registerUserInfo.name}</span>
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">ایمیل:</span>
                  <span className="text-sm font-semibold text-gray-900">{registerUserInfo.email}</span>
                </div>
                <div className="flex items-center justify-center mt-3 text-green-600">
                  <CheckCircle2 size={16} className="ml-1" />
                  <span className="text-sm font-semibold">حساب تایید شد</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                در حال انتقال به صفحه اتوبوس...
              </p>
              
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div className="bg-orange-500 h-1 rounded-full animate-progress" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  );
}
