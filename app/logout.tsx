"use client";

import {
  removeRefreshTokenClient,
  removeTokenClient,
} from "@/serverActions/cookieUtils";
import {
  removeRefreshTokenServer,
  removeTokenServer,
} from "@/serverActions/serverCookieUtils";

export default function Logout() {
  const logout = async () => {
    removeTokenClient();
    removeRefreshTokenClient();
    removeRefreshTokenServer();
    removeTokenServer();
  };
  return (
    <div className="hidden sm:flex" onClick={logout}>
      <a
        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
        href="/"
      >
        Logout
      </a>
    </div>
  );
}
