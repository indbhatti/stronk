import { getWorkout } from "@/serverActions/workout";
import { IWorkout } from "@/Types/models";
import K from "@/Utility/constants";
import { redirect } from "next/navigation";
import WorkoutName from "./workoutName";
import WorkoutDescription from "./workoutDescription";
import ExerciseTable from "./exerciseTable";
import ExerciseTableCell from "./exerciseTableCell";
import AddWorkoutExercise from "./addWorkoutExercise";

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
  console.log(workout);
  return (
    <>
      <WorkoutName workoutId={workoutId} name={workout.name} />
      <WorkoutDescription
        workoutId={workoutId}
        description={workout.description}
      />
      <ExerciseTable>
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
      </ExerciseTable>
      <div className="flex justify-end px-10">
        <AddWorkoutExercise workoutId={workoutId} />
      </div>
    </>
  );
}
