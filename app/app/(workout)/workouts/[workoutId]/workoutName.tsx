"use client";

import { editWorkoutName } from "@/serverActions/workout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WorkoutName({
  name,
  workoutId,
}: {
  name: string;
  workoutId: string;
}) {
  const [workoutName, setWorkoutName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (await editWorkoutName(workoutId, workoutName)) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (workoutName !== name) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [workoutName]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-end font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
        <input
          type="text"
          value={workoutName}
          onChange={handleChange}
          className="text-end font-semi-bold border-0 rounded-lg
        text-4xl dark:text-white font-black bg-transparent w-full"
        />
      </div>
      <div
        className={`w-full justify-end px-10 
      ${isEditing ? "flex" : "hidden"}
        `}
      >
        <button
          type="submit"
          disabled={loading}
          className="flex w-full rounded border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-medium
       text-white hover:bg-transparent dark:hover:text-white focus:outline-none 
       focus:ring active:text-opacity-75 sm:w-auto hover:text-black"
        >
          {loading ? "Saving..." : "Save"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className="dark:invert ml-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
}
