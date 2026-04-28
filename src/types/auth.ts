//represents a stored user in localStorage
export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

//represents an active session in localstorage
export type Session = {
  userId: string;
  email: string;
};

//supporting type, represents a nullable session state from localstorage
export type NullableSession = Session | null;