import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

describe("auth flow", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("submits signup form and calls handler", () => {
    const handleSignup = vi.fn();

    render(
      <SignupForm
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error=""
        loading={false}
        handleSignup={handleSignup}
        onLogin={() => {}}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    expect(handleSignup).toHaveBeenCalled();
  });

  it("shows error for duplicate signup email", () => {
    render(
      <SignupForm
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error="User already exists"
        loading={false}
        handleSignup={() => {}}
        onLogin={() => {}}
      />
    );

    expect(screen.getByText("User already exists")).toBeInTheDocument();
  });

  it("calls login handler on submit", () => {
    const handleLogin = vi.fn();

    render(
      <LoginForm
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error=""
        loading={false}
        handleLogin={handleLogin}
        onSignup={() => {}}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    expect(handleLogin).toHaveBeenCalled();
  });

  it("renders login error message", () => {
    render(
      <LoginForm
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error="Invalid email or password"
        loading={false}
        handleLogin={() => {}}
        onSignup={() => {}}
      />
    );

    expect(
      screen.getByText("Invalid email or password")
    ).toBeInTheDocument();
  });
});