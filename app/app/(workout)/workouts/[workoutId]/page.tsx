import { getWorkout } from "@/serverActions/workout";
import { IWorkout } from "@/Types/models";
import K from "@/Utility/constants";
import { redirect } from "next/navigation";
import WorkoutName from "./workoutName";
import WorkoutDescription from "./workoutDescription";

export default async function Page({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { workoutId } = await params;
  const workout: IWorkout | null = await getWorkout(workoutId);
  if (!workout) {
    redirect(K.Links.Workouts);
  }
  return (
    <>
      <WorkoutName workoutId={workoutId} name={workout.name} />
      <WorkoutDescription
        workoutId={workoutId}
        description={workout.description}
      />
    </>
  );
}
