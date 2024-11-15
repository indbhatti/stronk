import { fetchWithRetry } from "@/serverActions/fetch";
import { IMuscle } from "@/Types/models";
import MuscleItem from "./item";

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

export default async function Page() {
  const muscles: IMuscle[] = await getMuscles();
  return (
    <div>
      <h1 className="container mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black">
        MUSCLES
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20">
        {muscles ? (
          muscles.map((muscle) => (
            <MuscleItem
              key={muscle._id}
              name={muscle.name}
              scientificName={muscle.scientificName}
              image={null} // add image
              description={null} // add description to muscle model
            />
          ))
        ) : (
          <p>Failed to fetch muscles</p>
        )}
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
        <MuscleItem
          name={"he"}
          scientificName={"hsdf"}
          image={null} // add image
          description={null} // add description to muscle model
        />
      </div>
    </div>
  );
}
