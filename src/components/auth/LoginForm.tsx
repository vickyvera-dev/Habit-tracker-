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
  handleLogin: () => void;
  onSignup: () => void;
};

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  handleLogin,
  onSignup,
}: Props) {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-row gap-2 justify-center items-center">
        <span className="text-blue-500">
          <FaCheckCircle size={20} />
        </span>
        <h1 className="text-blue-500 text-2xl font-semibold">
          Habit Tracker
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome Back
        </h1>
        <p className="text-xs font-extralight text-gray-400">
          Login to continue tracking your habits
        </p>
      </div>

      {/* Form */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <BsEnvelope size={20} />
            </span>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LuLockKeyhole size={20} />
            </span>

            <input
              type="password"
              placeholder="Enter your password"
              required
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
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Signup */}
      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={onSignup}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}