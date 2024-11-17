import Link from "next/link";

export default function TableCell({
  values,
  href,
}: {
  values: string[];
  href: string;
}) {
  return (
    <tr className="text-gray-700 dark:text-gray-100">
      {values.map((value, index) => (
        <td
          key={index}
          className="whitespace-nowrap px-4 py-2 dark:text-white text-gray-900"
        >
          {value}
        </td>
      ))}
      <td className="whitespace-nowrap px-4 py-2 flex justify-center">
        <Link
          href={href}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
