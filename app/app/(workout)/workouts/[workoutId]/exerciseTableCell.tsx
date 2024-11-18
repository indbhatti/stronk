import { IWorkoutExercise } from "@/Types/models";
import EditWorkoutExercise from "./(editWE)/editWorkoutExercise";

export default function TableCell({
  wExercise,
}: {
  wExercise: IWorkoutExercise;
}) {
  return (
    <tr className="text-gray-700 dark:text-gray-100">
      <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-gray-900">
        {wExercise.exercise.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 ">
        {wExercise.exercise.description}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        {wExercise.exercise.muscle.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        {wExercise.sets.map((set) => (
          <div key={set._id}>
            {set.reps} reps at {set.weight} kgs
          </div>
        ))}
      </td>
      <td className="whitespace-nowrap px-4 py-2 flex justify-center">
        <EditWorkoutExercise wExercise={wExercise} />
      </td>
    </tr>
  );
}
