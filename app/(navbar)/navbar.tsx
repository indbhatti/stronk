import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Navitem from "./navitem";
import Theme from "../theme";
import Hamburger from "./hamburger";
import K from "@/Utility/constants";

export default async function Navbar() {
  const decodedToken = await getDecodedServerToken();
  return (
    <nav aria-label="Global">
      <ul className="items-center gap-6 text-sm hidden md:flex">
        <Navitem href={K.Links.Home} text="Home" />
        <Navitem href={K.Links.About} text="About" />
        {/* <Navitem href={K.Links.Contact} text="Contact" />
        <Navitem href={K.Links.Blog} text="Blog" /> */}
        {decodedToken ? (
          <>
            <Navitem href={K.Links.Dashboard} text="App" />
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
