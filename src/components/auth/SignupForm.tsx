"use client";

import { BsEnvelope } from "react-icons/bs";
import { LuLockKeyhole } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  loading: boolean;
  handleSignup: () => void;
  onLogin: () => void;
};

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  handleSignup,
  onLogin,
}: Props) {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-row gap-2 justify-center items-center">
        <span className="text-blue-500">
          <FaCheckCircle size={20} />
        </span>
        <h2 className="text-blue-500 text-2xl font-bold">
          Habit Tracker
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create an account
        </h1>
        <p className="text-xs text-gray-400">
          Sign up to start building better habits
        </p>
      </div>

      {/* Form */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <BsEnvelope size={20} />
            </span>

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LuLockKeyhole size={20} />
            </span>

            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* Redirect */}
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={onLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
}