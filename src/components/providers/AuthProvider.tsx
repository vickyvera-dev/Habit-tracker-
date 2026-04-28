"use client";

import { createContext, useContext, useEffect, useState } from "react";
import SplashScreen from "@/components/shared/SplashScreen";

type Session = {
  userId: string;
  email: string;
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("habit-tracker-session");

      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.userId && parsed?.email) {
          setSession(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("habit-tracker-session");
    setSession(null);
    window.location.href = "/login";
  };

  // 🔥 GLOBAL LOADER HERE
  if (loading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={{ session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}