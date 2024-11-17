import { fetchWithRetry } from "@/serverActions/fetch";
import Card from "../card";
import { IExercise } from "@/Types/models";
import { Suspense } from "react";
import Loading from "@/app/loading";

const getExercises = async () => {
  "use server";
  const response = await fetchWithRetry(`${process.env.API_URI}/exercise`, {
    method: "GET",
  });
  if (response.status !== 200) {
    console.error("Failed to fetch muscles");
    return null;
  }
  const data = await response.json();
  console.log(data);

  return data;
};

async function Exercise() {
  const exercises: IExercise[] = await getExercises();
  return (
    <>
      <h1 className="container mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
        EXERCISES
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20 px-10">
        {exercises ? (
          exercises.map((exercise) => (
            <Card
              key={exercise._id}
              title={exercise.name}
              subTitle={exercise.muscle.name}
              image={null} // add image
              description={exercise.description} // add description to muscle model
            />
          ))
        ) : (
          <p>Failed to Fetch Exercises</p>
        )}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="container mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
        EXERCISES
      </h1>
      <Suspense fallback={<Loading />}>
        <Exercise />
      </Suspense>
    </>
  );
}
