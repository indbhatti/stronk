import Image from "next/image";

export default function MuscleItem({
  name,
  scientificName,
  image,
  description,
}: {
  name: string;
  scientificName: string;
  image: string | null;
  description: string | null;
}) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <Image
        alt={name}
        src={image || "/placeholderGym.png"}
        width={500}
        height={500}
        className="h-56 w-full object-cover"
      />

      <div className="dark:bg-gray-900 bg-white p-4 sm:p-6">
        <p className="block text-xs dark:text-gray-200 text-gray-500">
          {scientificName}
        </p>

        <div className="mt-0.5 text-lg dark:text-gray-100 text-gray-900">
          {name}
        </div>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description}
        </p>
      </div>
    </article>
  );
}
