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
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg mx-10 md:mx-0">
      <img
        alt={name}
        src={
          image ||
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        }
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
