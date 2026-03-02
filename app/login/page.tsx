"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState<{ name: string; email: string; role: string } | null>(null);
  const { login, isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);

      // Get current user info
      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        // Show success popup
        setLoginUserInfo({
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
        });
        setShowSuccessPopup(true);

        // Redirect after 2 seconds
        setTimeout(() => {
          if (currentUser.role === "admin") {
            router.push("/admin/dashboard");
          } else if (currentUser.role === "vendor") {
            router.push("/vendor/buses");
          } else {
            router.push("/bus");
          }
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "ورود ناموفق بود");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/bus");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">ورود</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">ایمیل</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-right focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">رمز عبور</label>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-orange-600 font-semibold hover:underline">
              ثبت‌نام
            </Link>
          </p>
        </div>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && loginUserInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={48} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ورود موفق!
              </h2>

              <p className="text-gray-600 mb-4">
                خوش آمدید، <span className="font-semibold text-gray-900">{loginUserInfo.name}</span>
              </p>

              <div className="bg-gray-50 rounded-lg p-4 w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">ایمیل:</span>
                  <span className="text-sm font-semibold text-gray-900">{loginUserInfo.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">نقش:</span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${loginUserInfo.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      loginUserInfo.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                    }`}>
                    {loginUserInfo.role === 'admin' ? 'ادمین' : loginUserInfo.role === 'vendor' ? 'فروشنده' : 'کاربر'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                در حال انتقال به داشبورد...
              </p>

              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div className="bg-orange-500 h-1 rounded-full animate-progress" style={{ width: '100%' }}></div>
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