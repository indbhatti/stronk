"use client";
import { IWorkout } from "@/Types/models";
import Table from "../../table";
import TableCell from "../../tableCell";
import Card from "../../card";
import Link from "next/link";
import K from "@/Utility/constants";
import { useState } from "react";

export default function ToggleView({ workouts }: { workouts: IWorkout[] }) {
  const [view, setView] = useState<"grid" | "table">("grid");
  return (
    <>
      <div
        className="rounded-lg bg-gray-200 dark:bg-gray-900 text-sm font-medium
         dark:text-white mx-4 mb-10"
      >
        <button
          className={`text-lg mr-2 px-2 py-1 dark:hover:bg-gray-800 rounded-l-lg 
              ${
                view === "grid"
                  ? "dark:bg-gray-800 bg-gray-300"
                  : "dark:bg-gray-900 bg-gray-200"
              }`}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>
        <div className="inline border-r border-black dark:border-white"></div>
        <button
          className={`text-lg ml-2 px-2 py-1 dark:hover:bg-gray-800
              ${
                view === "table"
                  ? "dark:bg-gray-800 bg-gray-300"
                  : "dark:bg-gray-900 bg-gray-200"
              }`}
          onClick={() => setView("table")}
        >
          Table View
        </button>
      </div>

      {view === "grid" ? (
        <div
          className={`grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20 px-10`}
        >
          {workouts ? (
            workouts.map((workout) => (
              <Link
                key={workout._id}
                href={`${K.Links.Workouts}/${workout._id}`}
              >
                <Card
                  title={workout.name}
                  subTitle={new Date(workout.createdAt).toDateString()}
                  image={null} // add image
                  description={workout.description} // add description to muscle model
                />
              </Link>
            ))
          ) : (
            <h1>EMPTYYY!</h1>
          )}
        </div>
      ) : (
        <Table headings={["Name", "Description", "Created On", "Link"]}>
          {workouts ? (
            workouts.map((workout) => (
              <TableCell
                key={workout._id}
                values={[
                  workout.name,
                  workout.description,
                  new Date(workout.createdAt).toDateString(),
                ]}
                href={K.Links.Workouts + "/" + workout._id}
              />
            ))
          ) : (
            <h1>EMPTYYY!</h1>
          )}
        </Table>
      )}
    </>
  );
}
