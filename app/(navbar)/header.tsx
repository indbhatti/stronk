import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Navbar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import K from "@/Utility/constants";
import LogoutWrapper from "../logoutWrapper";

export default async function Header() {
  const decodedToken = await getDecodedServerToken();
  return (
    <header className="dark:bg-gray-950 bg-gray-300 px-5 md:px-10 py-2">
      <div className="flex items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link className=" text-white flex items-center" href="/">
            <span className="sr-only">Home</span>
            <Image
              src="/stronkFitness.png"
              alt="Fitness Icon"
              className="dark:invert"
              width={200}
              height={100}
            />
          </Link>
        </div>

        <div className="flex md:items-center md:gap-12 flex-row-reverse md:flex-row">
          <Navbar />
          <div className="flex items-center gap-4">
            {decodedToken == null ? (
              <div>
                <Link
                  className="rounded-md bg-indigo-600 px-5 py-2.5 mx-2 text-sm font-medium text-white shadow"
                  href={K.Links.Login}
                >
                  Login
                </Link>

                <Link
                  className="rounded-md bg-gray-200 dark:bg-gray-100 px-5 py-2.5 ml-2 text-sm font-medium text-indigo-600"
                  href={K.Links.Register}
                >
                  Register
                </Link>
              </div>
            ) : (
              <LogoutWrapper className="hidden sm:flex">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600"
                  href="/"
                >
                  Logout
                </Link>
              </LogoutWrapper>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
