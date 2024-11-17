"use server";

import { fetchWithRetry } from "./fetch";

export const getWorkouts = async () => {
  const response = await fetchWithRetry(`${process.env.API_URI}/workout`, {
    method: "GET",
  });
  if (response.status !== 200) {
    console.error("Failed to fetch workouts");
    return null;
  }
  const data = await response.json();
  console.log(data);

  return data;
};

export const addWorkout = async (name: string, description: string) => {
  const response = await fetchWithRetry(`${process.env.API_URI}/workout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  if (response.status !== 201) {
    console.error("Failed to add workout");
    return null;
  }
  const data = await response.json();
  console.log(data);

  return data;
};
