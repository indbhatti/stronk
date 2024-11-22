"use server";

import { IWorkout } from "@/Types/models";
import { fetchWithRetry } from "./fetch";
import { revalidateTag } from "next/cache";
import K from "@/Utility/constants";

export const getWorkouts = async () => {
  const response = await fetchWithRetry(`${process.env.API_URI}/workout`, {
    method: "GET",
    next: {
      tags: ["workouts"],
    },
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
  revalidateTag(K.Tags.Workouts);
  const data: IWorkout = await response.json();

  return data;
};

export const getWorkout = async (workoutId: string) => {
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout/${workoutId}`,
    {
      method: "GET",
      next: {
        tags: ["workout"],
      },
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
  workoutExercises?: string[];
}

export const editWorkout = async (
  workoutId: string,
  updateFields: EditWorkout
) => {
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
  revalidateTag(K.Tags.Workouts);
  revalidateTag(K.Tags.Workout);
  return true;
};

export const deleteWorkout = async (workoutId: string) => {
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout/${workoutId}`,
    {
      method: "DELETE",
    }
  );
  if (response.status !== 200) {
    console.error("Failed to delete workout");
    return false;
  }
  revalidateTag(K.Tags.Workouts);
  return true;
};
