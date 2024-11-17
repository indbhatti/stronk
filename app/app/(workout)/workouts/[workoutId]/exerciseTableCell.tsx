import { ISet } from "@/Types/models";
import K from "@/Utility/constants";
import Link from "next/link";

export default function ExerciseTableCell({
  name,
  description,
  muscle,
  sets,
}: {
  name: string;
  description: string;
  muscle: string;
  sets: ISet[];
}) {
  return (
    <tr className="text-gray-700 dark:text-gray-100">
      <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-gray-900">
        {name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 ">{description}</td>
      <td className="whitespace-nowrap px-4 py-2">{muscle}</td>
      <td className="whitespace-nowrap px-4 py-2">
        {sets.map((set) => (
          <div key={set._id}>
            {set.reps} reps at {set.weight} kgs
          </div>
        ))}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <Link
          href={`${K.Links.WorkoutExercise}`}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
