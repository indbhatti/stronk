"use server";

import { IWorkout } from "@/Types/models";
import { fetchWithRetry } from "./fetch";
import { revalidatePath } from "next/cache";
import K from "@/Utility/constants";

export const getWorkouts = async () => {
  const response = await fetchWithRetry(`${process.env.API_URI}/workout`, {
    method: "GET",
  });
  if (response.status !== 200) {
    console.error("Failed to fetch workouts");
    return null;
  }
  const data: IWorkout[] = await response.json();

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
  const data: IWorkout = await response.json();

  return data;
};

export const getWorkout = async (workoutId: String) => {
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout/${workoutId}`,
    {
      method: "GET",
    }
  );
  if (response.status !== 200) {
    console.log("Failed to fetch workout");
    return null;
  }
  const data: IWorkout = await response.json();

  return data;
};

interface EditWorkout {
  name?: string;
  description?: string;
}

export const editWorkout = async (
  workoutId: string,
  updateFields: EditWorkout
) => {
  console.log(updateFields);
  return true;
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout/${workoutId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFields),
    }
  );
  if (response.status !== 200) {
    console.error("Failed to edit workout name");
    return false;
  }
  revalidatePath(K.Links.Workouts);
  return true;
};
