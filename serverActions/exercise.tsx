"use server";
import { IExercise } from "@/Types/models";
import { fetchWithRetry } from "./fetch";
import { revalidateTag } from "next/cache";
import K from "@/Utility/constants";

export const getExercises = async () => {
  const response = await fetchWithRetry(`${process.env.API_URI}/exercise`, {
    method: "GET",
  });
  if (response.status !== 200) {
    console.error("Failed to fetch exercises");
    return [];
  }
  const data: IExercise[] = await response.json();

  return data;
};

export interface IExerciseData {
  exerciseId: string;
  sets: { reps: number; weight: number }[];
}

export const addWorkoutExercise = async (
  workoutId: string,
  workoutExercise: IExerciseData
) => {
  const data = {
    workoutId,
    exerciseId: workoutExercise.exerciseId,
    sets: workoutExercise.sets,
  };
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout-exercise`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag(K.Tags.Workout);
  if (response.status !== 201) {
    console.error("Failed to add workout exercise");
    return false;
  }
  return true;
};

export const editWorkoutExercise = async (
  workoutExerciseId: string,
  workoutExercise: IExerciseData
) => {
  const data = {
    sets: workoutExercise.sets,
  };
  const response = await fetchWithRetry(
    `${process.env.API_URI}/workout-exercise/${workoutExerciseId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag(K.Tags.Workout);
  if (response.status !== 200) {
    console.error("Failed to edit workout exercise");
    return false;
  }
  return true;
};
