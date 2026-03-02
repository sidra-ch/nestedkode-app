import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  phone?: string;
  vendorId?: string;
  lastLogin?: string;
  loginCount?: number;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

const API_BASE = typeof window !== "undefined"
  ? process.env.NEXT_PUBLIC_API_URL || ""
  : "";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await fetch(`${API_BASE}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim(), password: password.trim() }),
          });

          const contentType = res.headers.get("content-type");
          let data;

          if (!res.ok) {
            // Error handling
            if (contentType && contentType.includes("application/json")) {
              data = await res.json();
            } else {
              const text = await res.text();
              throw new Error("Login failed \n" + text);
            }
            throw new Error(data?.message || data?.error || "Login failed");
          }

          // Success handling
          if (contentType && contentType.includes("application/json")) {
            data = await res.json();
          } else {
            const text = await res.text();
            throw new Error("Login failed: Non-JSON response\n" + text);
          }

          // Map _id to id for frontend consistency
          let user = data.user;
          if (user && user._id) {
            user = { ...user, id: user._id };
            delete user._id;
          }

          set({
            token: data.token,
            user,
            isAuthenticated: true,
          });
        } catch (err) {
          console.error("Login fetch error:", err);
          throw err instanceof Error ? err : new Error("Login failed: " + String(err));
        }
      },

      register: async (name, email, password, phone = "") => {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, role: "user" }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || errorData.error || "Registration failed");
        }

        const data = await res.json();
        set({
          token: data.token,
          user: data.user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
