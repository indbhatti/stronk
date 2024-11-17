import { getWorkout } from "@/serverActions/workout";
import { IWorkout } from "@/Types/models";
import K from "@/Utility/constants";
import { redirect } from "next/navigation";
import WorkoutName from "./workoutName";
import WorkoutDescription from "./workoutDescription";
import ExerciseTableCell from "./exerciseTableCell";
import AddWorkoutExercise from "./addWorkoutExercise";
import Table from "../../../table";
import { Suspense } from "react";
import Loading from "@/app/loading";

async function WorkoutExercise({
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
      <Table headings={["Name", "Description", "Muscle", "Sets", "Link"]}>
        {workout.workoutExercises.map((exercise) => (
          <ExerciseTableCell
            key={exercise._id}
            name={exercise.exercise.name}
            description={exercise.exercise.description}
            muscle={exercise.exercise.muscle.name}
            sets={exercise.sets}
          />
        ))}
        {workout.workoutExercises.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-5">
              No Exercises
            </td>
          </tr>
        ) : (
          <></>
        )}
      </Table>
      <div className="flex justify-end px-10">
        <AddWorkoutExercise workoutId={workoutId} />
      </div>
    </>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <WorkoutExercise params={params} />
      </Suspense>
    </>
  );
}
