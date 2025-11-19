import type { Route } from "./+types/dashboard";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - App" }];
}

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("m62_auth");
    if (auth !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("m62_auth");
    navigate("/");
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to your dashboard. Quick links:</p>
      <ul className="space-y-2">
        <li>
          <Link to="/summary" className="text-blue-600 hover:underline">
            View Summary
          </Link>
        </li>
        <li>
          <Link to="/reports" className="text-blue-600 hover:underline">
            View Reports
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="text-gray-600 hover:underline">
            Sign out
          </button>
        </li>
      </ul>
    </main>
  );
}
