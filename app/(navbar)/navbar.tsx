import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Navitem from "./navitem";
import Theme from "../theme";
import Hamburger from "./hamburger";

export default async function Navbar() {
  const decodedToken = await getDecodedServerToken();
  return (
    <nav aria-label="Global">
      <ul className="items-center gap-6 text-sm hidden md:flex">
        <Navitem href="#" text="Home" />
        <Navitem href="#" text="About" />
        {decodedToken ? (
          <>
            <Navitem href="#" text="My Workouts" />
            <Navitem href="#" text="My Schedule" />
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
