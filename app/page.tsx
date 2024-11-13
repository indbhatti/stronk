// import { getDecodedServerToken } from "@/serverActions/serverCookieUtils";
import Banner from "./banner";
import Header from "./header";

export default async function Home() {
  // const decodedToken = await getDecodedServerToken();
  // const username = decodedToken ? decodedToken.username : null;
  // const email = decodedToken ? decodedToken.email : null;
  // const accessLevel = decodedToken ? decodedToken.accessLevel : null;

  return (
    <>
      <Header />
      <Banner />
    </>
  );
}
