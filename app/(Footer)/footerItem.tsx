import Link from "next/link";

export default function FooterItem({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-700 transition hover:text-gray-700/75"
      >
        {title}
      </Link>
    </li>
  );
}
