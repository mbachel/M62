import type { Route } from "./+types/reports";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reports - App" }];
}

export default function Reports() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>
      <p className="mb-4">List of reports will appear here.</p>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Back to Dashboard
      </Link>
    </main>
  );
}
