"use server";
import { refreshToken } from "./auth";
import { getTokenServer } from "./serverCookieUtils";

export async function fetchWithRetry(url: string, options: RequestInit) {
  // Initial request with the current access token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${(await getTokenServer())?.value}`,
    },
  });

  // If access token is expired, refresh the token and retry
  if (response.status === 401) {
    const tokenRefreshed = await refreshToken();

    if (tokenRefreshed) {
      // Retry the request with a new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${(await getTokenServer())?.value}`,
        },
      });
    }
  }

  return response;
}
