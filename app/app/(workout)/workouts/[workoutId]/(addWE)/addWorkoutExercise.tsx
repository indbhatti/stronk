"use client";

import { useState } from "react";
import AddWorkoutExerciseForm from "./addWorkoutExerciseForm";

export default function AddWorkoutExercise({
  workoutId,
}: {
  workoutId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white my-4"
      >
        Add Exercise
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        ${isOpen ? "" : "hidden"}
        `}
      >
        <AddWorkoutExerciseForm workoutId={workoutId} onClose={onClose} />
      </div>
    </>
  );
}
