"use client";

import { addWorkout } from "@/serverActions/workout";
import { useState } from "react";
import Popup, { PopupProps } from "./popup";

export default function AddWorkout() {
  const [workout, setWorkout] = useState({ name: "", description: "" });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      return;
    }
    if (await addWorkout(workout.name, workout.description)) {
      setPopup({
        title: "Success",
        message: "Workout added successfully",
        onConfirmMessage: "OK",
        onCancelMessage: "",
        onConfirm: () => {
          setPopup({ ...popup, buttonType: null });
          setIsOpen(false);
          setWorkout({ name: "", description: "" });
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
          setIsOpen(false);
          setWorkout({ name: "", description: "" });
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

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Add +
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        ${isOpen ? "" : "hidden"}
        `}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="mx-auto text-center font-semi-bold text-4xl my-8 dark:text-white font-black px-10">
            Add Workout
          </h1>
          <div className="flex justify-center w-full">
            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
            >
              <div className="w-full py-4">
                <label htmlFor="name" className="sr-only">
                  name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="bg-transparent border-0 text-xl w-full rounded-lg dark:text-white"
                    placeholder="Enter workout name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full py-4">
                <label htmlFor="description" className="sr-only">
                  Description
                </label>

                <div className="relative">
                  <textarea
                    className="border-0 text-xl bg-transparent w-full rounded-lg dark:text-white"
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
