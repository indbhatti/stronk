export default function ExerciseTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto mx-4 rounded-lg">
      <table
        className="min-w-full divide-y-2 dark:bg-black dark:divide-gray-700
       divide-gray-200 bg-white text-sm dark:text-white text-gray-700"
      >
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium">
              Exercise Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-mediu">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium">Muscle</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium ">Sets</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}
