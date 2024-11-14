import Banner from "./banner";
import Header from "./header";
import TestComponent from "./test";

export default async function Home() {
  return (
    <>
      <TestComponent />
      <Header />
      <Banner />
    </>
  );
}
