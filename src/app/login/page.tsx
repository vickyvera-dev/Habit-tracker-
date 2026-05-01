"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { session, loading, setSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  // ✅ Redirect if already logged in (SAFE now)
  useEffect(() => {
    if (loading) return;

    if (session) {
      router.replace("/dashboard");
    }
  }, [session, loading, router]);

  const handleLogin = () => {
    setError("");
    setLoadingBtn(true);

    try {
      const rawUsers = localStorage.getItem("habit-tracker-users");

      if (!rawUsers) {
        setError("No account found");
        setLoadingBtn(false);
        return;
      }

      const users: User[] = JSON.parse(rawUsers);

      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password.trim()
      );

      if (!user) {
        setError("Invalid email or password");
        setLoadingBtn(false);
        return;
      }

      // ✅ Use AuthProvider instead of localStorage directly
      setSession({
        userId: user.id,
        email: user.email,
      });

      // ✅ Immediate redirect (no waiting for effect)
      router.replace("/dashboard");
    } catch {
      setError("Something went wrong");
      setLoadingBtn(false);
    }
  };

  // optional: prevent flicker
  if (loading) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        loading={loadingBtn}
        handleLogin={handleLogin}
        onSignup={() => router.push("/signup")}
      />
    </main>
  );
}