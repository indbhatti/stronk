import Link from "next/link";

export default function SmallListItem({
  title,
  href,
  svg,
}: {
  title: string;
  href: string;
  svg: React.ReactNode;
}) {
  return (
    <div className="py-2">
      <Link
        href={href}
        className=" group relative flex justify-center rounded
         hover:bg-gray-50 text-gray-500 active:bg-indigo-50 px-2 py-1.5 active:text-indigo-700
          dark:hover:bg-gray-800 dark:text-white dark:active:bg-gray-900 dark:active:text-indigo-300
         "
      >
        {svg}

        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
          {title}
        </span>
      </Link>
    </div>
  );
}
