import Link from "next/link";

export default function LargeListItem({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-lg px-4 py-2 text-sm font-medium 
        text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100
        dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-900"
      >
        {title}
      </Link>
    </li>
  );
}
