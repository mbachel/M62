import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ className }: { className?: string }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined" && window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        //default to light mode
        return "light";
    });

    // apply theme class and persist when theme changes
    useEffect(() => {
        try {
            const root = document.documentElement;
            if (theme === "dark") root.classList.add("dark");
            else root.classList.remove("dark");
            localStorage.setItem("m62_theme", theme);
        } catch (err) {
            console.error(err);
        }
    }, [theme]);

    // resolved theme is managed above in state

    // if theme is dark, show FiSun (click => light)
    if (theme === "dark") {
        return (
            <FiSun size={45} className={"flex items-center text-(--navbar-text) bg-(--navbar) hover:cursor-pointer hover:bg-(--accent) rounded-full p-1 transition" + (className ? " " + className : "") } onClick={() => setTheme("light")} />
        );
    }

    // if theme is light, show FiMoon (click => dark)
    return (
        <FiMoon size={45} className={"flex items-center text-(--navbar-text) bg-(--navbar) hover:cursor-pointer hover:bg-(--accent) rounded-full p-1 transition" + (className ? " " + className : "") } onClick={() => setTheme("dark")} />
    );
}
