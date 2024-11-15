import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";

export default async function App() {
  const decodedToken = await getDecodedServerToken();
  return (
    <>
      <h1 className="container px-4 md:mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black">
        WELCOME{" "}
        <span className="bg-gradient-to-r dark:from-indigo-500 dark:via-gray-100 dark:to-blue-700 from-indigo-800 via-gray-900 to-indigo-800 bg-clip-text text-transparent">
          {decodedToken && decodedToken.username.toUpperCase()}
        </span>
        !
      </h1>
    </>
  );
}
