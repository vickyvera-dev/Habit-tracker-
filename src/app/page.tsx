"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    //ensure deterministic, testable delay
    const SPLASH_DELAY_MS = 1000;

    const timer = setTimeout(() => {
      try {
        const rawSession = 
        localStorage.getItem('habit-tracker-session');

        let isValidSession = false;

        if (rawSession) {
          try {const parsed = 
            JSON.parse(rawSession);

            if (parsed && 
              typeof parsed === 'object'
              &&
              typeof parsed.userId ===
              'string' &&
              typeof parsed.email ===
              'string'
            ) {
              isValidSession = true;
            }
          } catch {
            isValidSession = false;
          }
        }

        if (isValidSession) {
          router.replace('/dashboard');
        } else {
          router.replace('/login');
        }
      } catch {
        router.replace('/login');
      }
    }, SPLASH_DELAY_MS);

    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen flex items-center justify-center" data-testid="splash-screen">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Habit Tracker</h1>
        <p className="text-sm text-gray-500">Loading your habits...</p>
      </div>
    </main>
  );
}