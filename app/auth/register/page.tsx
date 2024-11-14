"use client";
import Theme from "@/app/theme";
import { registerUser } from "@/serverActions/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setError] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const temperrors: string[] = [];
    if (formData.password !== formData.password_confirmation) {
      temperrors.push("Passwords do not match");
    }
    if (formData.password.length < 6) {
      temperrors.push("Password must be at least 6 characters long");
    }
    if (formData.username.length < 3) {
      temperrors.push("Username must be at least 3 characters long");
    }
    setError(temperrors);

    if (temperrors.length == 0) {
      const res = await registerUser(
        formData.username,
        formData.email,
        formData.password
      );
      console.log(res.status);
      if (res.status === 200) {
        router.push("/auth/verify-email");
      } else if (res.status === 500) {
        setError(["Internal Server Error. Please try again later"]);
      } else if (res.status === 400) {
        setError(["User already exists"]);
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="gym"
            width={2000}
            height={2000}
            src="/gym.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-indigo-600" href="#">
              <span className="sr-only">Home</span>
              <Image
                className="mx-auto w-auto dark:invert"
                src="/stronkFitness.png"
                alt="fitness Icon"
                width={500}
                height={300}
              />
            </a>

            <h1 className="mt-6 text-2xl font-bold dark:text-gray-100 text-gray-900 sm:text-3xl md:text-4xl">
              Welcome
            </h1>

            <p className="mt-4 leading-relaxed dark:text-gray-300 text-gray-500">
              Way to go! You&apos;re one step closer to muscle growth
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm "
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6">
                {errors.map((error, i) => (
                  <ul key={i} className="list-disc pl-5">
                    <li className="text-red-500">{error}</li>
                  </ul>
                ))}
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  type="submit"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-100 sm:mt-0">
                  Already have an account?
                  <Link
                    href="/auth/login"
                    className="text-indigo-500 underline px-3"
                  >
                    Log in.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <div className="hidden">
        <Theme />
      </div>
    </section>
  );
}
