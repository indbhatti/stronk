import Navitem from "./navitem";
import Theme from "./theme";

export default function Navbar() {
  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        <Navitem href="#" text="Home" />
        <Navitem href="#" text="About" />
        <Navitem href="#" text="My Workouts" />
        <Navitem href="#" text="My Schedule" />
        <Theme />
      </ul>
    </nav>
  );
}
