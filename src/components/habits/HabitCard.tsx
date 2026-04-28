"use client";

import { BsTrash } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { getHabitSlug } from "@/lib/slug";

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
  habit: Habit;
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

export default function HabitCard({
  habit,
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
  const slug = getHabitSlug(habit.name);

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="space-y-2 shadow-lg p-8 bg-white rounded-md"
    >
      {/* Header */}
     <div className="flex justify-between items-center">
  {editingId === habit.id ? (
    <div className="flex flex-col gap-2 w-full">
      {/* Name */}
      <input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        placeholder="Habit name"
      />

      {/* Description */}
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        placeholder="Habit description"
      />
    </div>
  ) : (
    <h2 className="font-semibold text-md">{habit.name}</h2>
  )}

  {/* Action buttons */}
  <div className="flex flex-row gap-2 items-center">
    {editingId === habit.id ? (
      <>
        <button
          onClick={() => saveEdit(habit.id)}
          className="text-green-600"
        >
          Save
        </button>

        <button
          onClick={() => {
            setEditingId(null);
            setEditName("");
            setEditDescription("");
          }}
          className="text-gray-500"
        >
          Cancel
        </button>
      </>
    ) : (
      <button
        onClick={() => {
          setEditingId(habit.id);
          setEditName(habit.name);
          setEditDescription(habit.description);
        }}
        className="text-blue-600"
      >
        Edit
      </button>
    )}

    {/* Delete */}
    {confirmId === habit.id ? (
      <button
        onClick={() => {
          deleteHabit(habit.id);
          setConfirmId(null);
        }}
        className="text-red-600"
      >
        Confirm Delete
      </button>
    ) : (
      <button
        onClick={() => setConfirmId(habit.id)}
        className="text-red-500 px-4 py-2 flex flex-row gap-2 items-center border hover:underline rounded"
      >
        <BsTrash />
        Delete
      </button>
    )}
  </div>
</div>

      {/* Description */}
{habit.description && (
  <p className="text-sm text-gray-600">
    {habit.description}
  </p>
)}

      {/* Streak */}
      <p>Streak: {getStreak(habit)} days</p>

      {/* Toggle */}
      <button
        onClick={() => toggleComplete(habit.id)}
        className="w-full py-2 border-blue-600 border text-blue-600 hover:text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center font-bold gap-2"
      >
        <FaRegCheckCircle size={25} />
        Toggle Complete Today
      </button>
    </div>
  );
}