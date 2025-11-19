import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined" && window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        //default to light mode
        return "light";
    });

    useEffect(() => setMounted(true), []);

    // apply theme class and persist when theme changes
    useEffect(() => {
        try {
            const root = document.documentElement;
            if (theme === "dark") root.classList.add("dark");
            else root.classList.remove("dark");
            localStorage.setItem("m62_theme", theme);
        } catch {}
    }, [theme]);

    // if DOM not mounted, show placeholder
    if (!mounted) return (
        <img
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={36}
            height={36}
            alt="Loading theme toggle"
            className={"mx-6 " + (className ?? "")}
        />
    );

    // resolved theme is managed above in state

    // if theme is dark, show FiSun (click => light)
    if (theme === "dark") {
        return (
            <FiSun size={45} className={"flex items-center mx-6 hover:cursor-pointer hover:bg-(--secondary-accent) rounded-full p-1 transition" + (className ? " " + className : "") } onClick={() => setTheme("light")} />
        );
    }

    // if theme is light, show FiMoon (click => dark)
    return (
        <FiMoon size={45} className={"flex items-center mx-6 hover:cursor-pointer hover:bg-(--secondary-accent) rounded-full p-1 transition" + (className ? " " + className : "") } onClick={() => setTheme("dark")} />
    );
}
