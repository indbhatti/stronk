"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Theme() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.toggle("dark", savedTheme === "dark");
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const handleClick = () => {
    const newTheme = isDark ? "light" : "dark";
    document.body.classList.toggle("dark");
    setIsDark(!isDark);

    localStorage.setItem("theme", newTheme);
  };
  return (
    <button
      onClick={handleClick}
      className="ml-5 xl:ml-0 dark:bg-goodOrange-200 hover:rotate-12 active:scale-90 duration-100 transition-all"
    >
      <FontAwesomeIcon
        icon={isDark ? faMoon : faSun}
        className="dark:text-white"
      />
    </button>
  );
}
