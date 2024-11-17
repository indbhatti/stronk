import { fetchWithRetry } from "@/serverActions/fetch";
import { IMuscle } from "@/Types/models";
import Card from "../card";
import { Suspense } from "react";
import Loading from "@/app/loading";

const getMuscles = async () => {
  "use server";
  const response = await fetchWithRetry(`${process.env.API_URI}/muscle`, {
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

async function Muscles() {
  const muscles: IMuscle[] = await getMuscles();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20 px-10">
      {muscles ? (
        muscles.map((muscle) => (
          <Card
            key={muscle._id}
            title={muscle.name}
            subTitle={muscle.scientificName}
            image={null} // add image
            description={null} // add description to muscle model
          />
        ))
      ) : (
        <p>Failed to fetch muscles</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="container mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
        MUSCLES
      </h1>
      <Suspense fallback={<Loading />}>
        <Muscles />
      </Suspense>
    </>
  );
}
