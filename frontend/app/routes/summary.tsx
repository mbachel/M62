import type { Route } from "./+types/summary";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import ARChart from "../components/ARChart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Summary - M62" }];
}

export default function Summary() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Summary</h1>
      <p className="mb-4">This is a high-level summary of your data.</p>
      <ARChart />
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Back to Dashboard
      </Link>
    </main>
  );
}
