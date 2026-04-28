"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBoxArrowRight } from "react-icons/bs";

type Session = {
  userId: string;
  email: string;
};

type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
};

export default function DashboardPage() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  //  ONLY load data (ProtectedRoute handles auth now)
 useEffect(() => {
  const rawSession = localStorage.getItem("habit-tracker-session");
  if (!rawSession) return;

  const parsed: Session = JSON.parse(rawSession);
  setSession(parsed);

  const rawHabits = localStorage.getItem("habit-tracker-habits");

  let allHabits: Habit[] = [];

  if (rawHabits) {
    try {
      allHabits = JSON.parse(rawHabits);
    } catch {
      allHabits = [];
    }
  }

  const userHabits = allHabits.filter(
    (h) => h.userId === parsed.userId
  );

  setHabits(userHabits);
}, []);

  // Save habits
  const saveHabits = (updatedUserHabits: Habit[]) => {
    const raw = localStorage.getItem("habit-tracker-habits");

    let allHabits: Habit[] = [];

    if (raw) {
      try {
        allHabits = JSON.parse(raw);
      } catch {
        allHabits = [];
      }
    }

    const others = allHabits.filter(
      (h) => h.userId !== session?.userId
    );

    const merged = [...others, ...updatedUserHabits];

    localStorage.setItem(
      "habit-tracker-habits",
      JSON.stringify(merged)
    );

    setHabits(updatedUserHabits);
  };

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const addHabit = () => {
    if (!name.trim() || !session) return;

    const newHabit: Habit = {
      id: generateId(),
      userId: session.userId,
      name,
      description,
      frequency: "daily",
      createdAt: new Date().toISOString(),
      completions: [],
    };

    saveHabits([...habits, newHabit]);

    setName("");
    setDescription("");
  };

  const deleteHabit = (id: string) => {
    saveHabits(habits.filter((h) => h.id !== id));
  };

  const editHabit = (
    id: string,
    newName: string,
    newDescription: string
  ) => {
    const updated = habits.map((h) =>
      h.id === id
        ? { ...h, name: newName, description: newDescription }
        : h
    );

    saveHabits(updated);
  };

  const saveEdit = (id: string) => {
  editHabit(id, editName, editDescription);
  setEditingId(null);
  setEditName("");
  setEditDescription("");
};

  const getToday = () => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const getStreak = (habit: Habit) => {
    const today = getToday();
    const uniqueDates = Array.from(new Set(habit.completions));

    if (!uniqueDates.includes(today)) return 0;

    const sorted = uniqueDates.sort((a, b) =>
      b.localeCompare(a)
    );

    let streak = 0;

    for (let i = 0; i < sorted.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      const expectedStr = expectedDate
        .toISOString()
        .split("T")[0];

      if (sorted[i] === expectedStr) {
        streak++;
      } else break;
    }

    return streak;
  };

  const toggleComplete = (id: string) => {
    const today = getToday();

    const updated = habits.map((habit) => {
      if (habit.id !== id) return habit;

      const exists = habit.completions.includes(today);

      return {
        ...habit,
        completions: exists
          ? habit.completions.filter((d) => d !== today)
          : [...habit.completions, today],
      };
    });

    saveHabits(updated);
  };

  const logout = () => {
  localStorage.removeItem("habit-tracker-session");
  setSession(null);
  router.replace("/login");
};

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-4 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-600">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="px-4 py-2 flex gap-2 items-center bg-red-500 text-white rounded-lg"
          >
            <BsBoxArrowRight size={20} />
            Logout
          </button>
        </header>

        {/* Form */}
        <HabitForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          addHabit={addHabit}
        />

        {/* List */}
        <HabitList
          habits={habits}
          getStreak={getStreak}
          toggleComplete={toggleComplete}
          deleteHabit={deleteHabit}
          editingId={editingId}
          setEditingId={setEditingId}
          editName={editName}
          setEditName={setEditName}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          saveEdit={saveEdit}
          confirmId={confirmId}
          setConfirmId={setConfirmId}
        />
      </main>
    </ProtectedRoute>
  );
}