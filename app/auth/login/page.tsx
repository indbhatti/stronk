"use client";
import { loginUser, resendVerificationEmail } from "@/serverActions/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ title: string; status: number } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user.email || !user.password) {
      setLoading(false);
    }

    const res = await loginUser(user.email, user.password);
    if (res.status === 200) {
      router.push("/");
    } else if (res.status === 500) {
      setError({
        title: "Internal Server Error. Please try again later",
        status: 500,
      });
    } else if (res.status === 403) {
      setError({ title: "Email not verified", status: 403 });
    } else if (res.status === 401) {
      setError({ title: "Invalid credentials", status: 401 });
    } else if (res.status === 404) {
      setError({ title: "User not found", status: 404 });
    }
    setLoading(false);
  };

  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!user.email || !user.password) {
      setLoading(false);
    }
    const res = await resendVerificationEmail(user.email, user.password);
    console.log(res.status);
    if (res.status === 200) {
      router.push("/auth/verify-email");
    } else if (res.status === 500) {
      setError({
        title: "Internal Server Error. Please try again later",
        status: 500,
      });
    } else if (res.status === 401) {
      setError({ title: "Invalid credentials", status: 401 });
    } else if (res.status === 404) {
      setError({ title: "User not found", status: 404 });
    }
    setLoading(false);
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          {error && (
            <div>
              <ul className="list-disc pl-5">
                <li className="text-red-500">{error.title}</li>
                {error.status === 403 && (
                  <button
                    onClick={(e) => {
                      handleResend(e);
                    }}
                    className="text-indigo-400 hover:text-indigo-500 active:text-indigo-600 underline"
                  >
                    Resend verification email.
                  </button>
                )}
              </ul>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="disabled:bg-gray-700 disabled:border-gray-700 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
