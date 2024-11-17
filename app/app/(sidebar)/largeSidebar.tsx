import Image from "next/image";
import LargeListItem from "./largeListItem";
import LargeListDropDown from "./largeListdropDown";
import Theme from "@/app/theme";
import LogoutWrapper from "../../logoutWrapper";
import K from "@/Utility/constants";

export default function LargeSidebar() {
  return (
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
          <LargeListItem title="All Muscles" href={K.Links.Muscles} />
          <LargeListItem title="All Exercises" href={K.Links.Exercises} />
        </LargeListDropDown>

        <LargeListItem title="My Workouts" href={K.Links.Workouts} />
        <LargeListItem title="My Schedule" href={K.Links.Schedule} />

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
  );
}
