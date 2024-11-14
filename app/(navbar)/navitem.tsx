import Link from "next/link";

export default function Navitem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <li>
      <Link
        className="text-gray-500 transition hover:text-gray-500/75"
        href={href}
      >
        {" "}
        {text}{" "}
      </Link>
    </li>
  );
}
