"use client";

import { useState } from "react";
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
  const { login, isAuthenticated, user } = useAuthStore();

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
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    router.push("/bus");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm pr-10 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
              className="w-full rounded-lg bg-yellow-400 py-3 text-sm font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-yellow-600 font-semibold hover:underline">
              Register
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
                Login Successful!
              </h2>
              
              <p className="text-gray-600 mb-4">
                Welcome back, <span className="font-semibold text-gray-900">{loginUserInfo.name}</span>
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-semibold text-gray-900">{loginUserInfo.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Role:</span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    loginUserInfo.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    loginUserInfo.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {loginUserInfo.role.charAt(0).toUpperCase() + loginUserInfo.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Redirecting to your dashboard...
              </p>
              
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div className="bg-yellow-400 h-1 rounded-full animate-progress" style={{width: '100%'}}></div>
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
