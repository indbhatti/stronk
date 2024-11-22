"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Theme({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(true);
    }
  }, []);

  const handleClick = () => {
    const newTheme = isDark ? "light" : "dark";
    document.body.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);

    localStorage.setItem("theme", newTheme);
  };
  return (
    <button
      onClick={handleClick}
      className={`hover:rotate-12 active:scale-90 duration-100 transition-all ${className}`}
    >
      <Image
        src={isDark ? "/night.svg" : "/day.svg"}
        alt="theme"
        width={20}
        height={20}
        className={isDark ? "invert" : ""}
      />
    </button>
  );
}
