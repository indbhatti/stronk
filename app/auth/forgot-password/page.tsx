"use client";
import { forgotPasswordEmail } from "@/serverActions/auth";
import K from "@/Utility/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string | null>(null);
  const [errors, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const temperrors: string[] = [];
    setError(temperrors);

    if (temperrors.length == 0 && email) {
      const response = await forgotPasswordEmail(email);
      if (response.status === 200) {
        setSuccess("Email Sent!");
      } else if (response.status === 500) {
        setError(["Internal Server Error. Please try again later"]);
      } else if (response.status === 404) {
        setError(["Invalid token"]);
      }
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto w-auto dark:invert"
          src="/stronkFitness.png"
          alt="fitness Icon"
          width={500}
          height={300}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-300 text-gray-900">
          Enter Email to Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
              >
                Email
              </label>
            </div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          {success && (
            <div className="text-center text-green-500">{success}</div>
          )}
          <div>
            {errors.map((error, i) => (
              <ul key={i} className="list-disc pl-5">
                <li className="text-red-500">{error}</li>
              </ul>
            ))}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Email
            </button>
            <Link href={K.Links.Login}>
              <button className="my-2 flex w-full justify-center rounded-md border border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
