"use client";
import { forgotPassword } from "@/serverActions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PasswordResetPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const [password, setPassword] = useState<{
    password: string;
    passwordConformation: string;
  }>({
    password: "",
    passwordConformation: "",
  });
  const [errors, setError] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { token } = await params;
      setToken(token);
    })();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const temperrors: string[] = [];
    if (password.password !== password.passwordConformation) {
      temperrors.push("Passwords do not match");
    }
    if (password.password.length < 6) {
      temperrors.push("Password must be at least 6 characters long");
    }
    setError(temperrors);

    if (temperrors.length == 0 && token) {
      const response = await forgotPassword(password.password, token);
      if (response.status === 200) {
        router.push("/auth/login");
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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="passwordConformation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password Conformation
              </label>
            </div>
            <div className="mt-2">
              <input
                id="passwordConformation"
                name="passwordConformation"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            {errors.map((error, i) => (
              <ul key={i} className="list-disc pl-5">
                <li className="text-red-500">{error}</li>
              </ul>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
