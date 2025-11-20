import type { Route } from "./+types/dashboard";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { FaLinkedin } from 'react-icons/fa';

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
    <main className="pt-6 px-6 container mx-auto">
      <section className="py-6" id="welcome">
        <h1 className="text-4xl font-semibold mb-4">Dashboard</h1>
        <div className="pl-4 text-lg max-w-7xl">
          <h2>Welcome to the Dashboard! Here, you can find:</h2>
          <ul className="list-disc list-inside mt-2">
            <li className="pl-4">A list of references for all data on the site.</li>
            <li className="pl-4">A summary of the content on this site.</li>
            <li className="pl-4">A technical breakdown of the project.</li>
            <li className="pl-4">A set of quick links for easy navigation.</li>
          </ul>
        </div>
      </section>
      <hr />
      <section className="py-6" id="summary-project-description">
        <h2 className="text-3xl font-semibold mb-4">Summary and Project Description</h2>
        {/*References*/}
        <div className="text-lg max-w-7xl" id="references">
          <h3 className="pl-2 mb-2 text-2xl font-semibold">References</h3>
          <ul className="list-disc list-inside">
            <li className="pl-4">Hello world!</li>
            <li className="pl-4">Hello world 2!</li>
          </ul>
        </div>
        {/*Topic Summary*/}
        <div className="max-w-7xl" id="summary">
          <h3 className="pl-2 mb-2 text-2xl font-semibold">Summary</h3>
          <p className="pl-4 mb-2 text-lg">
            The content on this site...
          </p>
        </div>
        {/*Project Description*/}
        <div className="max-w-7xl" id="project-description">
          <h3 className="pl-2 mb-2 text-2xl font-semibold">Project Description</h3>
          <p className="pl-4 mb-2 text-lg">
            This project is a full-stack web application built as a final project for ITIS 5166 Backend Application Development.
          </p>
          <h3 className="pl-2 mb-2 text-2xl font-semibold">Tech Stack</h3>
          <ul className="mb-2 text-lg list-disc list-inside">
            <li className="pl-4">Frontend - React</li>
            <li className="pl-4">Styling - Tailwind CSS</li>
            <li className="pl-4">Authentication - JWT</li>
            <li className="pl-4">Backend - Python</li>
            <li className="pl-4">Database - MongoDB</li>
          </ul>
        </div>
      </section>
      <hr />
      <section className="py-6" id="quick-links">
        <h2 className="text-3xl font-semibold mb-4">Quick Links</h2>
        <ul className="pl-4 flex space-x-6 text-lg">
          <li>
            <Link to="/summary" className=" hover:underline">
              View Summary
            </Link>
          </li>
          <li>
            <Link to="/reports" className=" hover:underline">
              View Reports
            </Link>
          </li>
          <li>
            <button onClick={handleSignOut} className=" hover:underline">
              Sign out
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
}
