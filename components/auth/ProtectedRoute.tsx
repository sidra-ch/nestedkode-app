"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
};

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  requireAuth = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Redirect to login if authentication is required but user is not logged in
    if (requireAuth && !isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    // Check role-based access
    if (requireAuth && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (user.role === "vendor") {
          router.push("/vendor/buses");
        } else {
          router.push("/");
        }
      }
    }
  }, [isAuthenticated, user, requireAuth, allowedRoles, router]);

  // Show loading state while checking authentication
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check role authorization
  if (requireAuth && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
