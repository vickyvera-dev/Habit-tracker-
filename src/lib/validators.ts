export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateHabit(name: string) {
  return name.trim().length > 0;
}