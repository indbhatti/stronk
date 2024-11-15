import { getTokenServer } from "@/serverActions/serverCookieUtils";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = await getTokenServer();
  if (!token) {
    redirect("/auth/login");
  }
  return (
    <>
      <div className=" container mx-auto text-white">asdf</div>
    </>
  );
}
