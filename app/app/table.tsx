export default function Table({
  children,
  headings,
}: {
  children: React.ReactNode;
  headings: string[];
}) {
  return (
    <div className="overflow-x-auto mx-4 rounded-lg">
      <table
        className="min-w-full divide-y-2 dark:bg-black dark:divide-gray-700
       divide-gray-200 bg-white text-sm dark:text-white text-gray-700"
      >
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="whitespace-nowrap px-4 py-2 font-medium"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}
