"use client";

import { logoutUser } from "@/serverActions/serverCookieUtils";

export default function LogoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    logoutUser();
  };

  return (
    <div className={`${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}

// fix log out
