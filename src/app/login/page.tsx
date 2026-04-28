"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";


type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  //redirect if already authenjticated

  useEffect(() => {
    try {
      const rawSession = localStorage.getItem("habit-tracker-session");

      if (!rawSession) return;

      const parsed = JSON.parse(rawSession);

      if (
        parsed &&
        typeof parsed.userId === "string" &&
        parsed.userId.length > 0 &&
        typeof parsed.email === "string"
      ) {
        router.replace("/dashboard");
      }
    } catch {
      //fail silently (do not crash)
    }
  }, []);

  //handle login
  const handleLogin = () => {
    setError("");
    setLoading(true);
    try {
      const rawUsers = localStorage.getItem("habit-tracker-users");
      if (!rawUsers) {
        setError("No account found");
        setLoading(false);
        return;
      }
      let users: User[] = [];

      try {
        const parsed = JSON.parse(rawUsers);

        if (!Array.isArray(parsed)) {
          setError("Invalid stored data");
          setLoading(false);
          return;
        }

        users = parsed;
      } catch {
        setError("Invalid stored data");
        setLoading(false);
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      const user = users.find(
        (u) =>
          typeof u.id === "string" &&
          u.email.toLowerCase() === normalizedEmail &&
          u.password === normalizedPassword,
      );

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      //created session required by contractract
      //create session
      const session = {
        userId: user.id,
        email: user.email,
      };
      localStorage.setItem("habit-tracker-session", JSON.stringify(session));

      //redirect to dashboard
      router.replace("/dashboard");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    
  <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      handleLogin={handleLogin}
      onSignup={() => router.push("/signup")}
    />
  </main>

  );
}
