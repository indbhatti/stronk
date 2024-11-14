"use server";

import { fetchWithRetry } from "./fetch";

// Example function using fetchWithRetry
export async function getest() {
  try {
    const response = await fetchWithRetry(
      `${process.env.API_URI}/protectedTest`,
      { method: "GET" }
    );
    const result = await response.json();
    console.log(result.message);
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}
