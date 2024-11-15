import UpcomingItem from "./(upcoming)/upcomingItem";

export default function Dashboard() {
  return (
    <div className="px-4">
      <div
        className="flex items-center bg-gray-100 dark:bg-black h-[200px] w-full rounded-xl
      dark:text-gray-100 text-black py-4 my-4 overflow-x-scroll"
      >
        <h1 className="border-gray-500 border-r h-full text-lg font-black text-center flex items-center px-4">
          UPCOMING <br /> WORKOUTS
        </h1>
        <UpcomingItem title="Legs" />
        <UpcomingItem title="Legs" />
        <UpcomingItem title="Legs" />
        <UpcomingItem title="Legs" />
        <UpcomingItem title="Legs" />
      </div>
    </div>
  );
}

// <div
//   className="bg-gray-100 dark:bg-black h-[625px] w-full rounded-xl
// dark:text-gray-100 text-black p-4 my-4"
// >
//   <div
//     id="calender"
//     className="bg-gray-700 h-full w-full grid grid-cols-7 grid-rows-5 gap-1"
//   ></div>
// </div>
