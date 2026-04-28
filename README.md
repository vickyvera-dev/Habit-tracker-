# Habit Tracker PWA

A mobile-first Progressive Web App for tracking daily habits with authentication, streak tracking, and offline support.

---

##  Features

- User signup & login (local auth)
- Create, edit, delete habits
- Toggle daily completion
- Streak tracking logic
- Persistent storage using localStorage
- Splash screen + protected routes
- Installable PWA with offline support

---

##  Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- localStorage (persistence)
- Vitest (unit + integration tests)
- Playwright (E2E tests)

---

## Project Setup

### 1. Install dependencies

```bash
npm install

## development server
npm run dev

## App runs on: 
http://localhost:3000

## Unit tests
npm run test:unit

## Integration tests
npm run test:integration

##E2E tests
npm run test:e2e

## All tests
npm test

## Local Storage Structure: The app uses browser localStorage only:
habit-tracker-users
{
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

## Session
habit-tracker-session

{
  userId: string;
  email: string;
}

## Habits

habit-tracker-habits

{
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
}

Auth Flow
Signup creates user + session
Login validates credentials
Session stored in localStorage
Protected routes redirect if unauthenticated

