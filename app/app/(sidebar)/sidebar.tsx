import LargeSidebar from "./largeSidebar";
import SmallSidebar from "./smallSidebar";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full flex max-w-[300px] float-left">
      <div className="flex md:hidden h-screen w-16 flex-col justify-between dark:border-e-gray-950 border-e dark:bg-black bg-white">
        <SmallSidebar />
      </div>
      <div className="hidden md:flex  h-screen flex-1 flex-col justify-between dark:border-e-gray-950 border-e dark:bg-black bg-white">
        <LargeSidebar />
      </div>
    </div>
  );
}
