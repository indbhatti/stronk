import { getWorkouts } from "@/serverActions/workout";
import { IWorkout } from "@/Types/models";
import AddWorkout from "./addWorkout";
import ToggleView from "./toggleView";
import { Suspense } from "react";
import Loading from "@/app/loading";

async function WorkoutList() {
  const workouts: IWorkout[] | null = await getWorkouts();
  return (
    <>{workouts ? <ToggleView workouts={workouts} /> : <h1>EMPTYYY!</h1>}</>
  );
}

export default function Page() {
  return (
    <>
      <div className="flex justify-between my-8 px-10">
        <AddWorkout />
        <h1 className="text-end font-semi-bold text-4xl dark:text-white font-black">
          MY WORKOUTS
        </h1>
      </div>
      <Suspense fallback={<Loading />}>
        <WorkoutList />
      </Suspense>
    </>
  );
}
