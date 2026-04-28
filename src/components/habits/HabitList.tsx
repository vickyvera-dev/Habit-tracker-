"use client";

import HabitCard from "@/components/habits/HabitCard";

type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
};

type Props = {
  habits: Habit[];
  getStreak: (habit: Habit) => number;
  toggleComplete: (id: string) => void;
  deleteHabit: (id: string) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  editName: string;
  setEditName: (value: string) => void;
  editDescription: string;
  setEditDescription: (value: string) => void;
  saveEdit: (id: string) => void;
  confirmId: string | null;
  setConfirmId: (id: string | null) => void;
};

export default function HabitList({
  habits,
  getStreak,
  toggleComplete,
  deleteHabit,
  editingId,
  setEditingId,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  saveEdit,
  confirmId,
  setConfirmId,
}: Props) {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
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
      ))}
    </div>
  );
}