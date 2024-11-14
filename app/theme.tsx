"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      {isDark ? (
        <Image
          src="night.svg"
          alt="night"
          width={20}
          height={20}
          className="invert"
        />
      ) : (
        <Image src="day.svg" alt="day" width={20} height={20} />
      )}
    </button>
  );
}
