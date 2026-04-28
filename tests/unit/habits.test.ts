export type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
};

// ADD HABIT
export function addHabit(habits: Habit[], newHabit: Habit): Habit[] {
  return [...habits, newHabit];
}

// DELETE HABIT
export function deleteHabit(habits: Habit[], id: string): Habit[] {
  return habits.filter((h) => h.id !== id);
}

// TOGGLE COMPLETION
export function toggleComplete(
  habits: Habit[],
  id: string,
  date: string
): Habit[] {
  return habits.map((habit) => {
    if (habit.id !== id) return habit;

    const exists = habit.completions.includes(date);

    return {
      ...habit,
      completions: exists
        ? habit.completions.filter((d) => d !== date)
        : [...habit.completions, date],
    };
  });
}