"use client";

import { useState } from "react";
import Popup, { PopupProps } from "../popup";
import SearchTerm from "./searchTerm";
import { addWorkoutExercise, IExerciseData } from "@/serverActions/exercise";
import { deleteWorkout } from "@/serverActions/workout";
import { useRouter } from "next/navigation";
import K from "@/Utility/constants";

export default function AddWorkoutExercise({
  workoutId,
}: {
  workoutId: string;
}) {
  const [workoutExercise, setWorkoutExercise] = useState<IExerciseData>({
    exerciseId: "",
    sets: [{ reps: 0, weight: 0 }],
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState<PopupProps>({
    title: "",
    message: "",
    onConfirmMessage: "",
    onCancelMessage: "",
    onConfirm: () => {},
    onCancel: () => {},
    buttonType: null,
  });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (workoutExercise.exerciseId === "") {
      setPopup({
        title: "Error",
        message: "Please Select the Exercise from the drop down",
        onConfirmMessage: "OK",
        onCancelMessage: "",
        onConfirm: () => {
          setPopup({ ...popup, buttonType: null });
        },
        onCancel: () => {
          setPopup({ ...popup, buttonType: null });
        },
        buttonType: "danger",
      });
      setLoading(false);
      return;
    }
    if (await addWorkoutExercise(workoutId, workoutExercise)) {
      setLoading(false);
      setPopup({
        title: "Success",
        message: "Exercise added successfully",
        onConfirmMessage: "OK",
        onCancelMessage: "",
        onConfirm: () => {
          setPopup({ ...popup, buttonType: null });
          setIsOpen(false);
          setWorkoutExercise({
            exerciseId: "",
            sets: [{ reps: 0, weight: 0 }],
          });
        },
        onCancel: () => {
          setPopup({ ...popup, buttonType: null });
        },
        buttonType: "success",
      });
    } else {
      setPopup({
        title: "Error",
        message: "Exercise could not be added",
        onConfirmMessage: "OK",
        onCancelMessage: "",
        onConfirm: () => {
          setPopup({ ...popup, buttonType: null });
          setIsOpen(false);
          setWorkoutExercise({
            exerciseId: "",
            sets: [{ reps: 0, weight: 0 }],
          });
        },
        onCancel: () => {
          setPopup({ ...popup, buttonType: null });
        },
        buttonType: "danger",
      });
    }
    setLoading(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newSets = [...workoutExercise.sets];
    newSets[index] = { ...newSets[index], [name]: parseFloat(value) };
    setWorkoutExercise({ ...workoutExercise, sets: newSets });
  };

  const setExercise = (exercise: string) => {
    setWorkoutExercise({ ...workoutExercise, exerciseId: exercise });
  };

  const addSet = () => {
    setWorkoutExercise({
      ...workoutExercise,
      sets: [...workoutExercise.sets, { reps: 0, weight: 0 }],
    });
  };

  const removeSet = () => () => {
    setWorkoutExercise({
      ...workoutExercise,
      sets: workoutExercise.sets.filter(
        (_, i) => i !== workoutExercise.sets.length - 1
      ),
    });
  };

  const deleteWorkoutClicked = async () => {
    setPopupDelete({
      title: "DO YOU WANT TO DELETE THIS WORKOUT?",
      message: "This action cannot be undone",
      onConfirmMessage: "DELETE",
      onCancelMessage: "GO BACK",
      onConfirm: async () => {
        if (await deleteWorkout(workoutId)) {
          setPopupDelete({ ...popupDelete, buttonType: null });
          router.push(K.Links.Workouts);
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
      <div className="w-full flex justify-between">
        <button
          onClick={deleteWorkoutClicked}
          className="rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white my-4"
        >
          Delete Workout
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white my-4"
        >
          Add Exercise
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        ${isOpen ? "" : "hidden"}
        `}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="mx-auto text-center font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
            Add Exercise
          </h1>
          <div className="flex justify-center w-full">
            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
            >
              <SearchTerm setExercise={setExercise} />

              <div className="w-full py-4">
                <h1 className="dark:text-white text-xl mb-4">Sets</h1>
                {workoutExercise.sets.map((set, index) => (
                  <div key={index} className="flex my-4 items-center">
                    <label htmlFor="reps" className="dark:text-white">
                      Reps:
                    </label>
                    <input
                      type="number"
                      min={1}
                      name="reps"
                      onChange={(e) => handleChange(e, index)}
                      className="bg-transparent border-0 text-xl w-1/2 rounded-lg dark:text-white basis-2/5"
                      placeholder="1"
                    />
                    <label htmlFor="weight" className="dark:text-white">
                      Weight:
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      name="weight"
                      onChange={(e) => handleChange(e, index)}
                      className="bg-transparent border-0 text-xl w-1/2 rounded-lg dark:text-white basis-2/5"
                      placeholder="10.5"
                    />
                    <p className="text-white pr-1">Kg</p>
                  </div>
                ))}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={addSet}
                    className="dark:text-white bg-green-600 hover:bg-red-700 px-4 py-1 rounded-lg text-xl font-bold"
                  >
                    +
                  </button>
                  {workoutExercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={removeSet()}
                      className="dark:text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-xl font-bold"
                    >
                      -
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="disabled:bg-gray-700 disabled:border-gray-700 block w-full rounded-lg
                 bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                {loading ? "Adding..." : "Add"}
              </button>
              <button
                type="button"
                className="block w-full border
               rounded-lg border-indigo-600 px-5 py-3 text-sm font-medium dark:text-white"
                onClick={onClose}
              >
                Close
              </button>
            </form>
            {popup.buttonType && (
              <Popup
                title={popup.title}
                message={popup.message}
                onConfirmMessage={popup.onConfirmMessage}
                onCancelMessage={popup.onCancelMessage}
                onConfirm={popup.onConfirm}
                onCancel={popup.onCancel}
                buttonType={popup.buttonType}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
