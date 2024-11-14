"use client";

import { logoutUser } from "@/serverActions/serverCookieUtils";
import Link from "next/link";

export default function Logout() {
  const logout = async () => {
    logoutUser();
  };
  return (
    <div className="hidden sm:flex" onClick={logout}>
      <Link
        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
        href="/"
      >
        Logout
      </Link>
    </div>
  );
}
