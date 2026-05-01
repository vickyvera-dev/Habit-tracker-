"use client";

import SignupForm from "@/components/auth/SignupForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { session, loading, setSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Use AuthProvider instead of localStorage
  useEffect(() => {
    if (loading) return;

    if (session) {
      router.replace("/dashboard");
    }
  }, [session, loading, router]);

  const handleSignup = () => {
    if (loadingBtn) return;

    setError("");
    setLoadingBtn(true);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError("Email and password are required");
      setLoadingBtn(false);
      return;
    }

    try {
      const rawUsers = localStorage.getItem("habit-tracker-users");

      let users: User[] = rawUsers ? JSON.parse(rawUsers) : [];

      const existingUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        setError("User already exists");
        setLoadingBtn(false);
        return;
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        password: normalizedPassword,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem(
        "habit-tracker-users",
        JSON.stringify(updatedUsers)
      );

      // Use AuthProvider
      setSession({
        userId: newUser.id,
        email: newUser.email,
      });

      router.replace("/dashboard");
    } catch {
      setError("Something went wrong");
      setLoadingBtn(false);
    }
  };

  if (loading) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SignupForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        loading={loadingBtn}
        handleSignup={handleSignup}
        onLogin={() => router.push("/login")}
      />
    </main>
  );
}