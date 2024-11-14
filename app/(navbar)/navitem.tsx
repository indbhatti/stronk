export default function Navitem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <li>
      <a
        className="text-gray-500 transition hover:text-gray-500/75"
        href={href}
      >
        {" "}
        {text}{" "}
      </a>
    </li>
  );
}
