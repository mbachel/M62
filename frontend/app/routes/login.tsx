import type { Route } from "./+types/login";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login - App" }];
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.detail || "Login failed.");
      return;
    }

    const { access_token } = await res.json();
    localStorage.setItem("m62_token", access_token);
    navigate("/dashboard");
  }

  return (
    <main className="flex flex-col pt-16 p-4 container mx-auto max-w-md">
      <h2 className="flex items-center justify-center text-4xl font-semibold mb-24">Welcome to Project M62</h2>
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-3xl font-semibold">Login</h2>
        <ThemeToggle />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Username&nbsp;<span className="text-red-600">*</span></label>
          <input
            className="w-full border rounded p-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg">Password&nbsp;<span className="text-red-600">*</span></label>
          <input
            className="w-full border rounded p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-(--accent) text-(--navbar-text) text-lg rounded hover:cursor-pointer" type="submit">
            Sign in
          </button>
          <Link to="/" className="px-4 py-2 ml-4 text-lg rounded hover:underline" id="reset">
            Reset
          </Link>
        </div>
      </form>
    </main>
  );
}
