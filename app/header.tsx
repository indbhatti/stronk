import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Navbar from "./navbar";
import Logout from "./logout";

export default async function Header() {
  const decodedToken = await getDecodedServerToken();
  return (
    <header className="bg-gray-900 px-10">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            {/* <img></img> */}
          </a>
        </div>

        <div className="md:flex md:items-center md:gap-12">
          <Navbar />
          <div className="flex items-center gap-4">
            {decodedToken == null ? (
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="/auth/login"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="/auth/register"
                  >
                    Register
                  </a>
                </div>
              </div>
            ) : (
              <Logout />
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                {/* <img></img> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
