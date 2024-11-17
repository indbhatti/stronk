import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Dashboard from "./dashboard";
import { Suspense } from "react";
import Loading from "../loading";

async function CreateApp() {
  const decodedToken = await getDecodedServerToken();
  return (
    <>
      <h1 className="container md:mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black px-4">
        WELCOME{" "}
        <span className="bg-gradient-to-r dark:from-indigo-500 dark:via-gray-100 dark:to-blue-700 from-indigo-800 via-gray-900 to-indigo-800 bg-clip-text text-transparent">
          {decodedToken && decodedToken.username.toUpperCase()}
        </span>
        !
      </h1>
      <Dashboard />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateApp />
    </Suspense>
  );
}
