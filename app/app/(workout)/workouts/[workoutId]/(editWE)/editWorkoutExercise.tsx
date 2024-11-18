"use client";

import { useState } from "react";
import EditWorkoutExerciseForm from "./editWorkoutExerciseForm";
import { IWorkoutExercise } from "@/Types/models";

export default function EditWorkoutExercise({
  wExercise,
}: {
  wExercise: IWorkoutExercise;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
      >
        Edit
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        ${isOpen ? "" : "hidden"}
        `}
      >
        <EditWorkoutExerciseForm wExercise={wExercise} onClose={onClose} />
      </div>
    </>
  );
}
