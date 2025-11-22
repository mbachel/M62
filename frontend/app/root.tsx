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
    localStorage.removeItem("m62_token");
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
          <header>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <nav className="flex items-center border-2 rounded-full overflow-hidden my-2 dark:border-(--navbar-text)">
                <Link to="/dashboard" className="bg-(--accent) text-(--navbar-text) border-(--navbar-text) px-8 flex items-center h-10 text-xl font-medium hover:underline rounded-l-full">
                  Dashboard
                </Link>
                <Link to="/summary" className="bg-(--accent) text-(--navbar-text) border-(--navbar-text) px-8 flex items-center h-10 text-xl font-medium hover:underline border-l">
                  Summary
                </Link>
                <Link to="/reports" className="bg-(--accent) text-(--navbar-text) border-(--navbar-text) px-8 flex items-center h-10 text-xl font-medium hover:underline border-l">
                  Reports
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <button onClick={handleSignOut} className="rounded transition p-1 text-lg button px-2 py-1">
                  Sign out
                </button>
                <ThemeToggle />
              </div>
            </div>
          </header>
        )}
        <main className="pt-4">
          <div key={location.pathname} className="page-container">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {showNav && (
        <footer className="bg-(--navbar) text-(--navbar-text) h-16 flex items-center justify-center text-lg">
          &copy; 2025 Matthew Bachelder
        </footer>
      )}
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
