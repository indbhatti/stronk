import K from "@/Utility/constants";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="dark:bg-gray-950 text-white">
      {" "}
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-indigo-600 via-black to-purple-600 dark:from-green-300 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl pb-3">
            Understand Muscle Growth.
            <span className="sm:block"> Increase Hypertrophy. </span>
          </h1>

          <p className="dark:text-white text-black mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Join us on an adventure to understand muscle growth and increase
            hypertrophy.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto hover:text-black"
              href={K.Links.Register}
            >
              Get Started
            </Link>

            <Link
              className="dark:text-white text-black block w-full rounded border border-indigo-600 px-12 py-3 text-sm font-medium hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto hover:text-white"
              href={K.Links.About}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
