import { STORAGE_KEYS } from "./constants";
import { getItem, setItem } from "./storage";

export type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
};

export function getHabits(userId: string): Habit[] {
  const all = getItem<Habit[]>(STORAGE_KEYS.HABITS) || [];
  return all.filter((h) => h.userId === userId);
}

export function saveHabits(userId: string, userHabits: Habit[]) {
  const all = getItem<Habit[]>(STORAGE_KEYS.HABITS) || [];

  const others = all.filter((h) => h.userId !== userId);

  setItem(STORAGE_KEYS.HABITS, [...others, ...userHabits]);
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}