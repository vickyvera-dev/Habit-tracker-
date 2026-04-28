export const validateHabitName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const validateHabitDescription = (description: string): boolean => {
  return description.trim().length <= 200;
};