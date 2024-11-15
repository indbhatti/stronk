import { getTokenServer } from "@/serverActions/serverCookieUtils";
import Announcement from "./announcement";
import Banner from "./banner";

export default async function Home() {
  const token = await getTokenServer();
  return (
    <>
      {token && <Announcement />}
      <Banner />
    </>
  );
}
