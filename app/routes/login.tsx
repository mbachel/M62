import type { Route } from "./+types/login";
import { Link, useNavigate } from "react-router";
import { type FormEvent, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login - App" }];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    // Very simple client-side "auth" for demo purposes
    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }

    // Fake authentication success: store a flag and navigate
    localStorage.setItem("m62_auth", "true");
    navigate("/dashboard");
  }

  return (
    <main className="pt-16 p-4 container mx-auto max-w-md">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="w-full border rounded p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            className="w-full border rounded p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
            Sign in
          </button>
          <Link to="/login" className="text-sm text-gray-600 hover:underline">
            Reset
          </Link>
        </div>
      </form>
    </main>
  );
}
