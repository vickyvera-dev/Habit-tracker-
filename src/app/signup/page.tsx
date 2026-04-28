'use client';

import SignupForm from "@/components/auth/SignupForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};
export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //redirect if already authenticated
  useEffect(() => {
    try {
      const rawSession = 
      localStorage.getItem('habit-tracker-session');

       if (!rawSession) return;

       const parsed = 
       JSON.parse(rawSession);
      if (
  parsed &&
  typeof parsed.userId === 'string' &&
  parsed.userId.length > 0 &&
  typeof parsed.email === 'string'
) {
  router.replace('/dashboard');
}    
    } catch {
      //fail silently
    }
  }, []);
 
 const id =
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  

  //handle signup
  const handleSignup = () => {
  setError('');
  setLoading(true);

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    setError('Email and password are required');
    setLoading(false);
    return;
  }

  try {
    const rawUsers = localStorage.getItem('habit-tracker-users');

    let users: User[] = [];

    if (rawUsers) {
      let parsed;
      try {
      parsed = JSON.parse(rawUsers);
    } catch {
      setError('Invalid stored data');
      setLoading(false);
      return;
}
      users = parsed;
    }

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      setError('User already exists');
      setLoading(false);
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
      'habit-tracker-users',
      JSON.stringify(updatedUsers)
    );

    const session = {
      userId: newUser.id,
      email: newUser.email,
    };

    localStorage.setItem(
      'habit-tracker-session',
      JSON.stringify(session)
    );

    router.replace('/dashboard');
  } catch {
    setError('Something went wrong');
    setLoading(false);
  }
};
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <SignupForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      handleSignup={handleSignup}
      onLogin={() => router.push("/login")}
    />
  </main>
  )
}