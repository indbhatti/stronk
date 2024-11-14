import { fetchWithRetry } from "@/serverActions/fetch";
import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import { IMuscle } from "@/Types/models";
import { redirect } from "next/navigation";
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
  const decodedToken = await getDecodedServerToken();
  if (!decodedToken) {
    redirect("/auth/login");
  }

  const muscles: IMuscle[] = await getMuscles();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto my-20">
      {muscles.map((muscle) => (
        <MuscleItem
          key={muscle._id}
          name={muscle.name}
          scientificName={muscle.scientificName}
          image={null} // add image
          description={null} // add description to muscle model
        />
      ))}
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
      <MuscleItem
        name={"herlo"}
        scientificName={"sadf"}
        image={null} // add image
        description={null} // add description to muscle model
      />
    </div>
  );
}
