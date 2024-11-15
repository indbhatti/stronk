export default function UpcomingItem({ title }: { title: string }) {
  return (
    <h1
      className="border-gray-500 border-r h-full text-lg text-center 
    flex items-center justify-center px-4 w-[200px] overflow-hidden
    hover:bg-gray-950
    "
    >
      {title}
    </h1>
  );
}
