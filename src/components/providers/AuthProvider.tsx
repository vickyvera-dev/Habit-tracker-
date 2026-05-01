"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Session = {
  userId: string;
  email: string;
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  setSession: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("habit-tracker-session");

      if (raw) {
        const parsed = JSON.parse(raw);

        if (parsed?.userId && parsed?.email) {
          setSessionState(parsed);
        } else {
          setSessionState(null);
        }
      } else {
        setSessionState(null);
      }
    } catch {
      setSessionState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const setSession = (session: Session | null) => {
    if (session) {
      localStorage.setItem(
        "habit-tracker-session",
        JSON.stringify(session)
      );
    } else {
      localStorage.removeItem("habit-tracker-session");
    }

    setSessionState(session);
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, setSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}