import { STORAGE_KEYS } from "./constants";
import { getItem, setItem } from "./storage";

type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export type Session = {
  userId: string;
  email: string;
};

export function getSession(): Session | null {
  return getItem<Session>(STORAGE_KEYS.SESSION);
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function login(email: string, password: string): Session | null {
  const users = getItem<User[]>(STORAGE_KEYS.USERS) || [];

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) return null;

  const session = { userId: user.id, email: user.email };

  setItem(STORAGE_KEYS.SESSION, session);

  return session;
}

export function signup(email: string, password: string): Session | null {
  const users = getItem<User[]>(STORAGE_KEYS.USERS) || [];

  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) return null;

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updated = [...users, newUser];
  setItem(STORAGE_KEYS.USERS, updated);

  const session = { userId: newUser.id, email: newUser.email };
  setItem(STORAGE_KEYS.SESSION, session);

  return session;
}