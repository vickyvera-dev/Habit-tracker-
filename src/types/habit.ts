//represents a habit stored in localstorage

export type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: 'daily';
  createdAt: string;
  completions: string[];
};

//represents a calendar date string in YYY-MM-DD format
export type HabitDate = string;