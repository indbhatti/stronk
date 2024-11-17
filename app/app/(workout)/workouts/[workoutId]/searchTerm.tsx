"use client";

import { getExercises } from "@/serverActions/exercise";
import { IExercise } from "@/Types/models";
import { useEffect, useState } from "react";

export default function SearchTerm({
  setExercise,
}: {
  setExercise: (exercise: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);
  const [filteredExerciseList, setFilteredExerciseList] = useState<IExercise[]>(
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDialogOpen(true);
    setSearchTerm(e.target.value);
    setExercise("");
  };

  const handleSelect = (exercise: IExercise) => {
    setSearchTerm(exercise.name);
    setExercise(exercise._id);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    // fetch exercise list
    async function fetchExerciseList() {
      const data: IExercise[] = await getExercises();
      setExerciseList(data);
    }
    fetchExerciseList();
    // fetch exercise list
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredExerciseList(exerciseList);
    } else {
      const filteredList = exerciseList.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExerciseList(filteredList);
    }
  }, [searchTerm]);

  return (
    <div className="w-full py-4">
      <label htmlFor="name" className="dark:text-white text-xl">
        Search Exercise
      </label>

      <div className="relative my-5">
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="bg-transparent border-0 text-xl w-full rounded-lg dark:text-white"
          value={searchTerm}
          placeholder="Chest.."
        />
        {isDialogOpen && (
          <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
            {filteredExerciseList.map((exercise) => (
              <li
                key={exercise._id}
                onClick={() => handleSelect(exercise)}
                className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
              >
                {exercise.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
