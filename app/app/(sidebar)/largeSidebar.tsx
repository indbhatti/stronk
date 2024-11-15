import Image from "next/image";
import LargeListItem from "./largeListItem";
import LargeListDropDown from "./largeListdropDown";
import Theme from "@/app/theme";
import LogoutWrapper from "./logoutWrapper";

export default function LargeSidebar() {
  return (
    <div className="hidden md:flex  h-screen flex-1 flex-col justify-between dark:border-e-gray-950 border-e dark:bg-black bg-white">
      <div className="px-4 py-6">
        <Image
          className="mx-auto w-auto dark:invert"
          src="/stronkFitness.png"
          alt="fitness Icon"
          width={500}
          height={500}
        />
        <ul className="mt-14 space-y-1">
          <LargeListItem title="General" href="/app" />

          <LargeListDropDown title="Learn">
            <LargeListItem title="All Muscles" href="/app/muscles" />
            <LargeListItem title="All Exercises" href="/app/exercises" />
          </LargeListDropDown>

          <LargeListItem title="My Workouts" href="/app/workouts" />
          <LargeListItem title="My Schedule" href="/app/schedule" />

          <LargeListDropDown title="Account">
            <LogoutWrapper>
              <LargeListItem title="Logout" href="#" />
            </LogoutWrapper>
          </LargeListDropDown>
        </ul>
        <Theme
          className={
            "rounde:-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-900 sticky bottom-0"
          }
        />
      </div>
    </div>
  );
}
