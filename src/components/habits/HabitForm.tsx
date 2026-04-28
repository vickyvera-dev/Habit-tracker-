"use client";

import { BsPlus } from "react-icons/bs";

type Props = {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  addHabit: () => void;
};

export default function HabitForm({
  name,
  setName,
  description,
  setDescription,
  addHabit,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-gray-600 font-medium mb-1">
        Create Habit
      </h2>

      <form
        className="space-y-3 shadow-lg p-8 bg-white rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
        }}
      >
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="habit-name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Habit Name
          </label>

          <input
            id="habit-name"
            placeholder="Enter habit name"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter habit description"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center font-bold gap-2"
        >
          <BsPlus size={25} />
          Add Habit
        </button>
      </form>
    </div>
  );
}