"use client";

import { logoutUser } from "@/serverActions/serverCookieUtils";
import { useRouter } from "next/navigation";

export default function LogoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const handleClick = async () => {
    if (await logoutUser()) {
      router.push("/");
    }
  };

  return (
    <div className={`${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}

// fix log out
