"use client";

import { useState } from "react";
import Popup, { PopupProps } from "../../popup";
import { deleteWorkout } from "@/serverActions/workout";
import { useRouter } from "next/navigation";
import K from "@/Utility/constants";

export default function DeleteWorkoutExercise({
  workoutId,
}: {
  workoutId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [popupDelete, setPopupDelete] = useState<PopupProps>({
    title: "",
    message: "",
    onConfirmMessage: "",
    onCancelMessage: "",
    onConfirm: () => {},
    onCancel: () => {},
    buttonType: null,
  });
  const router = useRouter();

  const deleteWorkoutClicked = async () => {
    setPopupDelete({
      title: "DO YOU WANT TO DELETE THIS WORKOUT?",
      message: "This action cannot be undone",
      onConfirmMessage: "DELETE",
      onCancelMessage: "GO BACK",
      onConfirm: async () => {
        setLoading(true);
        if (await deleteWorkout(workoutId)) {
          setPopupDelete({ ...popupDelete, buttonType: null });
          router.push(K.Links.Workouts);
        } else {
          setLoading(false);
          setPopupDelete({
            title: "Error",
            message: "Could not delete workout",
            onConfirmMessage: "OK",
            onCancelMessage: "",
            onConfirm: () => {
              setPopupDelete({ ...popupDelete, buttonType: null });
            },
            onCancel: () => {
              setPopupDelete({ ...popupDelete, buttonType: null });
            },
            buttonType: "danger",
          });
        }
      },
      onCancel: () => {
        setPopupDelete({ ...popupDelete, buttonType: null });
      },
      buttonType: "danger",
    });
  };

  return (
    <>
      {popupDelete.buttonType && (
        <Popup
          title={popupDelete.title}
          message={popupDelete.message}
          onConfirmMessage={popupDelete.onConfirmMessage}
          onCancelMessage={popupDelete.onCancelMessage}
          onConfirm={popupDelete.onConfirm}
          onCancel={popupDelete.onCancel}
          buttonType={popupDelete.buttonType}
        />
      )}
      <button
        onClick={deleteWorkoutClicked}
        className="rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white my-4"
      >
        {loading ? "Deleting..." : "Delete Workout"}
      </button>
    </>
  );
}
