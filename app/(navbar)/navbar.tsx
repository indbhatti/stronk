import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Navitem from "./navitem";
import Theme from "../theme";
import Hamburger from "./hamburger";

export default async function Navbar() {
  const decodedToken = await getDecodedServerToken();
  return (
    <nav aria-label="Global">
      <ul className="items-center gap-6 text-sm hidden md:flex">
        <Navitem href="/" text="Home" />
        <Navitem href="/about" text="About" />
        <Navitem href="/muscles" text="Muscles" />
        <Navitem href="/exercises" text="Exercises" />
        {decodedToken ? (
          <>
            <Navitem href="/workouts" text="My Workouts" />
            <Navitem href="/schedule" text="My Schedule" />
          </>
        ) : (
          <></>
        )}
        <Theme />
      </ul>
      <Hamburger decodedToken={decodedToken} />
    </nav>
  );
}
