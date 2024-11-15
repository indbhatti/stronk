import LargeSidebar from "./largeSidebar";
import SmallSidebar from "./smallsb";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full flex max-w-[300px] float-left">
      <SmallSidebar />
      <LargeSidebar />
    </div>
  );
}
