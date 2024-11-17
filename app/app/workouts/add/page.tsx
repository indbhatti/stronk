"use client";

import { addWorkout } from "@/serverActions/workout";
import { useState } from "react";
import Popup, { PopupProps } from "../popup";
import { useRouter } from "next/navigation";
import K from "@/Utility/constants";

export default function Page() {
  const [workout, setWorkout] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [popup, setPopup] = useState<PopupProps>({
    title: "",
    message: "",
    onConfirmMessage: "",
    onCancelMessage: "",
    onConfirm: () => {},
    onCancel: () => {},
    buttonType: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 10000));
    if (workout.name === "" || workout.description === "") {
      setPopup({
        title: "Error",
        message: "Please fill all fields",
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
      return;
    }
    if (await addWorkout(workout.name, workout.description)) {
      setPopup({
        title: "Success",
        message: "Workout added successfully. Click OK to go to all workouts",
        onConfirmMessage: "OK",
        onCancelMessage: "",
        onConfirm: () => {
          setPopup({ ...popup, buttonType: null });
          router.push(K.Links.Workouts);
        },
        onCancel: () => {
          setPopup({ ...popup, buttonType: null });
        },
        buttonType: "success",
      });
    } else {
      setPopup({
        title: "Error",
        message: "Workout could not be added",
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
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Add Workout
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-black dark:shadow-gray-900"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              name
            </label>

            <div className="relative">
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter workout name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>

            <div className="relative">
              <textarea
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                name="description"
                rows={4}
                placeholder="Enter descirption"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="disabled:bg-gray-700 disabled:border-gray-700 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
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
  );
}
