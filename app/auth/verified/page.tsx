import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-gray-100 p-11 rounded-full m-4">
        <h1>ACCOUNT VERIFIED COTINUTE TO LOGIN</h1>
      </div>
      <div>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-700 rounded-full text-white m-4"
        >
          <button>Home</button>
        </Link>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-blue-500 rounded-full text-white m-4"
        >
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
