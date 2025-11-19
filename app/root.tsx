import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import ThemeToggle from "./components/ThemeToggle";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const showNav = location.pathname !== "/";

  function handleSignOut() {
    localStorage.removeItem("m62_auth");
    navigate("/");
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {showNav && (
          <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800 backdrop-blur z-30">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <nav className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:underline">
                  Dashboard
                </Link>
                <Link to="/summary" className="text-sm font-medium text-gray-700 hover:underline">
                  Summary
                </Link>
                <Link to="/reports" className="text-sm font-medium text-gray-700 hover:underline">
                  Reports
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button onClick={handleSignOut} className="text-sm text-gray-700 hover:underline">
                  Sign out
                </button>
              </div>
            </div>
          </header>
        )}
        <main className="pt-16">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
