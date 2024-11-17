import { getWorkouts } from "@/serverActions/workout";
import Card from "../../card";
import { IWorkout } from "@/Types/models";
import K from "@/Utility/constants";
import Link from "next/link";

export default async function Page() {
  const workouts: IWorkout[] | null = await getWorkouts();
  return (
    <>
      <div className="flex justify-between my-8 px-10">
        <Link href={K.Links.AddWorkout}>
          <button className="text-white">Add Workout</button>
        </Link>
        <h1 className="text-end font-semi-bold text-4xl dark:text-white font-black">
          MY WORKOUTS {workouts ? workouts.length : 0}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20 px-10">
        {workouts ? (
          workouts.map((workout) => (
            <Link key={workout._id} href={`${K.Links.Workouts}/${workout._id}`}>
              <Card
                title={workout.name}
                subTitle={new Date(workout.createdAt).toLocaleDateString()}
                image={null} // add image
                description={workout.description} // add description to muscle model
              />
            </Link>
          ))
        ) : (
          <h1>EMPTYYY!</h1>
        )}
      </div>
    </>
  );
}
